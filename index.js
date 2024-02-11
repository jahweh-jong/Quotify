document.addEventListener('alpine:init', () => {
    Alpine.data('comparisons', () => ({
        compaForm : {
            quoteType : 'single',
            IDs : ''
        },
        result: '',
        alertMessageCompa: '',
        resultShowAlertCompa : false,
        quotify(){
            if (this.compaForm.IDs){
                const quoteType = this.compaForm.quoteType
                const IDs = this.compaForm.IDs

                if (quoteType === 'single') {
                    quote = "'";
                  } else if (quoteType === 'double') {
                    quote = '"';
                  }
                  const cleanIDs = IDs.replace(/['",-/(/)]/g, '')
                  const idArray = cleanIDs.split('\n').filter(id => id.trim() !== "");
                  const quotedStrings = idArray.map(id => quote + id + quote).join(',\n');
                  
                  this.result = quotedStrings
                  
            }else{
                console.log('Empty Item IDs')
            }
        },
        copyToClipboard(){  
             navigator.clipboard.writeText(this.result).then(() => {
                this.alertMessageCompa = "Copied to clipboard!"
                this.resultShowAlertCompa = true
                setTimeout(() => { this.resultShowAlertCompa = false; }, 3000)
              }, function(err) {
                this.alertMessageCompa = `Unable to copy error: ${err}`
                this.resultShowAlertCompa = true
                setTimeout(() => { this.resultShowAlertCompa = false; }, 3000)
              });
        }
    }))

    Alpine.data('rankings', () => ({
        rankingsForm : { 
            keywords : '',
            retailer : ''
        },
        result: '',
        alertMessageRank: '',
        resultShowAlertRank : false,
        quotify(){
            if (this.rankingsForm.keywords && this.rankingsForm.retailer){ 
                const keywords = this.rankingsForm.keywords
                const retailer = this.rankingsForm.retailer
                const cleanKeywords = keywords.replace(/['",/(/)]/g, '')
                const keywordsArray = cleanKeywords.split('\n').filter(kw => kw.trim() !== "");
                const objArray = keywordsArray.map(kw => ({ 
                    "keyword" : kw,
                    "retailer" : retailer
                }))
                this.result = JSON.stringify(objArray, null, 4) 
            }else{
                console.log('Empty Keyword or Retailer field')
            }
        },
        copyToClipboard(){  
            navigator.clipboard.writeText(this.result).then(() => {
               this.alertMessageRank = "Copied to clipboard!"
               this.resultShowAlertRank = true
               setTimeout(() => { this.resultShowAlertRank = false; }, 3000)
             }, function(err) {
               this.alertMessageRank = `Unable to copy error: ${err}`
               this.resultShowAlertRank = true
               setTimeout(() => { this.resultShowAlertRank = false; }, 3000)
             });
       }
    })) 
})

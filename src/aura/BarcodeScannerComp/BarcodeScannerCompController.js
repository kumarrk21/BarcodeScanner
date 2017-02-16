({
   
    doInit:function(cmp,evt,helper){
      
      if (window.addEventListener) {
          window.addEventListener("message", function(result){
            helper.getBarCode(cmp,evt,result);
          }, false);
      } else {
          window.attachEvent("onmessage", function(result){
            helper.getBarCode(cmp,evt,result);
          });
      }
      
    },

    scanBarCode: function(cmp, evt, helper) {
        var barcodeContainer = cmp.find('uploadBarcode').getElement();
        barcodeContainer.click();
    },

    uploadBarcode: function(cmp, evt, helper) {
        $A.util.removeClass(cmp.find('_spinner'),"slds-hide");
        var file = evt.target.files[0];
        var reader = new FileReader();
        var blob = file.slice(0, file.size);
        reader.readAsBinaryString(blob);

        reader.onloadend = function(e) {
            if (e.target.readyState == FileReader.DONE) {

                var fileContent = 'data:' + file.type + ';base64,' + btoa(e.target.result);
                var barCodeImage = cmp.find('barCodeImage').getElement();
                barCodeImage.src = fileContent;

                $A.util.removeClass(cmp.find('_barCodeImageContainer'),"slds-hide");
                var quaggaData = {};
                quaggaData.imageWidth = 800;
                if(barCodeImage.naturalWidth>800){
                  quaggaData.imageWidth = barCodeImage.naturalWidth;
                }
                quaggaData.fileContent = fileContent;
                var quaggaFrame = cmp.find('_quaggaFrame');
                quaggaFrame.getElement().contentWindow.postMessage(JSON.stringify(quaggaData), '*');

            }
        }

    }

})

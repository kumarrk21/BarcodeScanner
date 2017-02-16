({
    getBarCode:function(cmp,evt,result){
    	$A.util.removeClass(cmp.find('_barCode'),"slds-hide");
    	var _result = JSON.parse(result.data);
        var barCode = 'NULL';
 		try{
            barCode = _result.codeResult.code;
        }catch(e){
     	    console.log('result is ', _result);
        }
        cmp.set('v.barCode',barCode);
        $A.util.addClass(cmp.find('_spinner'),"slds-hide");
    }
})
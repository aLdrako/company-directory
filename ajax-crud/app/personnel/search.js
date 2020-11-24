$(document).ready(function(){
 
    $(document).on('submit', '#search-personnel-form', function(){
 
        let keywords = $(this).find(":input[name='keywords']").val();
 
        $.getJSON("http://localhost/company-directory/api/personnel/search.php?s=" + keywords, function(data){
 
            readPersonnelTemplate(data, keywords);

            changePageTitle("Search: " + keywords);
 
        });
        
        return false;
    });
 
});
$(document).ready(function(){
 
    $(document).on('submit', '#search-personnel-form', function(){
 
        let keywords = $(this).find(":input[name='keywords']").val();
 
        $.getJSON("http://localhost/company-directory/api/personnel/search.php?s=" + keywords, function(data){
 
            readPersonnelTemplate(data, keywords);

            $('#create-personnel').remove();
            $('#navbar a:first-child').after('<button class="btn btn-outline-light btn-sm mr-auto read-personnel-btn" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>');

            changePageTitle("Search: " + keywords);
 
        });
        
        return false;
    });
 
});
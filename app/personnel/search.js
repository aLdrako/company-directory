$(document).ready(function(){

    let filterOptionsHtml = '<option value="" disabled selected>Sort</option>';

    $.getJSON("http://localhost/company-directory/api/location/read.php", function(data) {
                    
        $.each(data.records, function(key, value) {

            filterOptionsHtml += `<option value='${value.id}'>${value.name}</option>`;
        });
        
    });
 
    $(document).on('submit', '#search-personnel-form', function(){
 
        let keywords = $(this).find(":input[name='keywords']").val();
 
        $.getJSON("http://localhost/company-directory/api/personnel/search.php?s=" + keywords, function(data){
 
            readPersonnelTemplate(data, keywords, filterOptionsHtml);

            $('#create-personnel').remove();
            $('#navbar a:first-child').after('<button class="btn btn-outline-light btn-sm read-personnel-btn mr-1" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>');

            changePageTitle("Search: " + keywords);
 
        }).fail(function() {
            $('#alertMsg').modal('show');
        });;
        
        return false;
    });
 
});
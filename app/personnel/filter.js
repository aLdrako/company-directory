$(document).ready(function(){

    let filterOptionsHtml = '<option value="" disabled selected>Sort</option>';

    $.getJSON("http://localhost/company-directory/api/location/read.php", function(data) {
                    
        $.each(data.records, function(key, value) {

            filterOptionsHtml += `<option value='${value.name}'>${value.name}</option>`;
        });

    });
 
    $(document).on('change', '#filter-personnel-form', function(){

        let filter = $('option:selected').text();
 
        $.getJSON("http://localhost/company-directory/api/personnel/filter.php?f=" + filter, function(data){
 
            readPersonnelTemplate(data, "", filterOptionsHtml);

            $('#create-personnel').remove();
            $('#navbar a:first-child').after('<button class="btn btn-outline-light btn-sm read-personnel-btn mr-1" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>');

            changePageTitle("In " + filter);
 
        }).fail(function() {
            $('.alert').removeClass('d-none');
        });
        
        return false;
    });
 
});
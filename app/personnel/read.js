let filterOptionsHtml = '<option value="" disabled selected>Sort</option>';

$(document).ready(function(){

    $.getJSON("http://localhost/company-directory/api/location/read.php", function(data) {
                    
        $.each(data.records, function(key, value) {

            filterOptionsHtml += `<option value='${value.name}'>${value.name}</option>`;
        });

    });

    showPersonnel();

    $(document).on('click', '.read-personnel-btn', function(){
        showPersonnel();
    });

});

function showPersonnel(){
 
    $.getJSON("http://localhost/company-directory/api/personnel/read.php", function(data){
 
        readPersonnelTemplate(data, "", filterOptionsHtml);
 
        changePageTitle("Personnel");

        $('.tooltip').remove();
 
    });
}
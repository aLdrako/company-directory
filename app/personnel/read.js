$(document).ready(function(){

    $.getJSON("http://localhost/company-directory/api/location/read.php", function(data) {
                    
        $.each(data.records, function(key, value) {

            filterOptionsHtml += `<option value='${value.name}'>${value.name}</option>`;
            locations.push(value.name);
        });

    });

    $.getJSON("http://localhost/company-directory/api/department/read.php", function(data) {
                    
        $.each(data.records, function(key, value) {

            departments.push(value.name);
        });
    });

    showPersonnel(filterOptionsHtml);

    $(document).on('click', '.read-personnel-btn', function(){
        
        filterOptionsHtml = '<option value="" disabled selected>Sort</option>';
        locations.forEach(el => {
            filterOptionsHtml += `<option value='${el}'>${el}</option>`;
        });

        showPersonnel(filterOptionsHtml);
    });

});

function showPersonnel(filter){
 
    $.getJSON("http://localhost/company-directory/api/personnel/read.php", function(data){
 
        readPersonnelTemplate(data, "", filter);
 
        changePageTitle("Personnel");

        $('.tooltip').remove();
 
    });
}
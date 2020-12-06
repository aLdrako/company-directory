$(document).ready(function() {

    $.getJSON("http://localhost/company-directory/api/location/read.php", function(data) {
                    
        $.each(data.records, function(key, value) {

            filterOptionsHtml += `<option value='${value.name}'>${value.name}</option>`;
            locationsArray.push(value.name);
        });

    });

    $.getJSON("http://localhost/company-directory/api/department/read.php", function(data) {
                    
        $.each(data.records, function(key, value) {

            departmentsArray.push({'name': value.name, 'locationId': value.locationId});
        });
    });

    $.getJSON("http://localhost/company-directory/api/personnel/read.php", function(data) {
                    
        $.each(data.records, function(key, value) {

            departmentsActiveArray.push(value.departmentId);
        });
    });

    showPersonnel();

    $(document).on('click', '.read-personnel-btn', function() {
        
        filterOptionsHtml = '<option value="" disabled selected>Sort</option>';
        locationsArray.forEach(el => {
            filterOptionsHtml += `<option value='${el}'>${el}</option>`;
        });
        showPersonnel();
    });

});

function showPersonnel() {
 
    $.getJSON("http://localhost/company-directory/api/personnel/read.php", function(data) {

        readPersonnelTemplate(data, "");
 
        changePageTitle("Personnel");

        $('.tooltip').remove();
 
    });
}
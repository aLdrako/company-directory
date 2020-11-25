$(document).ready(function(){

    showPersonnel();

    $(document).on('click', '.read-personnel-btn', function(){
        showPersonnel();
    });

});

function showPersonnel(){
 
    $.getJSON("http://localhost/company-directory/api/personnel/read.php", function(data){
 
        readPersonnelTemplate(data, "");
 
        changePageTitle("Personnel");

        $('.tooltip').remove();
 
    });
}
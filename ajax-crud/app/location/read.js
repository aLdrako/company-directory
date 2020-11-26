$(document).ready(function(){

    $(document).on('click', '.read-location-btn', function(){
        showLocation();
    });

});

function showLocation(){
 
    $.getJSON("http://localhost/company-directory/api/location/read.php", function(data){
 
        readLocationTemplate(data, "");
 
        changePageTitle("Locations");

        $('.tooltip').remove();
 
    });
}
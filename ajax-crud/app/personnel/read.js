$(document).ready(function(){

    showPersonnel();
    // when a 'read products' button was clicked
    $(document).on('click', '.read-personnel-btn', function(){
        showProducts();
    });
 
});
 
// function to show list of products
function showPersonnel(){
 
    // get list of products from the API
    $.getJSON("http://localhost/company-directory/api/personnel/read.php", function(data){
 
        // html for listing products
        readPersonnelTemplate(data, "");
 
        changePageTitle("Read Personnel");
 
    });
}
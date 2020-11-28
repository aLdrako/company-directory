$(document).ready(function(){

    $(document).on('click', '.read-department-btn', function(){
        showDepartment();
    });

});

function showDepartment(){
 
    $.getJSON("http://localhost/company-directory/api/department/read.php", function(data){
 
        readDepartmentTemplate(data, "");
 
        changePageTitle("Departments");

        $('.tooltip').remove();
 
    });
}
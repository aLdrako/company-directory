$(document).ready(function(){

    $(document).on('click', '.create-department-btn', function(){

        $('.tooltip').remove();

        $.getJSON("http://localhost/company-directory/api/location/read.php", function(data){
        
            let locationOptionsHtml = `<select name='locationId' id="location" class="form-control">`;

            $.each(data.records, function(key, value){
                locationOptionsHtml += `<option value='${value.id}'>${value.name}</option>`;
            });

            locationOptionsHtml += `</select>`;

            let createDepartmentHtml = ` 
                <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
                    <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
                    <button id="read-personnel" class="btn btn-outline-light btn-sm read-personnel-btn" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>
                    <button id="update-department" class="btn btn-outline-warning btn-sm mr-auto ml-1 update-department-btn"  data-toggle="tooltip" title="Update department" data-placement="top"><i class="far fa-edit"></i></button>
                </nav>

                <form id='create-department-form' action='#' method='post'>
                    <div class="container-fluid">
                        <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 department-info">
                            <div class="col-10 col-md-6 rounded department-data pt-2">
                                <label class="sr-only" for="name">Name</label>
                                <label class="sr-only" for="location">Location</label>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-network-wired"></i></div>
                                    </div>
                                    <input class="form-control" type='text' name='name' id="name" placeholder="Department name" required />
                                    ${locationOptionsHtml}
                                    <div class="input-group-append">
                                        <button class="btn btn-sm btn-outline-warning text-uppercase" type="submit">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            `;

            $("#page-content").html(createDepartmentHtml);
            
            changePageTitle("Add department");
        });
    });
 
    $(document).on('submit', '#create-department-form', function(){
        
        let formData = JSON.stringify($(this).serializeObject());

        $.ajax({
            url: "http://localhost/company-directory/api/department/create.php",
            type : "POST",
            contentType : 'application/json',
            data : formData,
            success : function(result) {
                showPersonnel();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
        
        return false;
    });
});
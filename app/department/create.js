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
                <!-- ALERT MESSAGE -->
                <div class="modal fade" id="alertMsg" tabindex="-1" aria-labelledby="alertMsgLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm alert alert-danger text-center">   
                        <strong>Location with this name already exists!</strong>
                    </div>
                </div>
        
                <!-- NAVBAR -->
                <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
                    <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
                    <button id="read-personnel" class="btn btn-outline-light btn-sm read-personnel-btn" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>
                    <button id="read-department" class="btn btn-outline-light btn-sm ml-1 mr-auto read-department-btn"  data-toggle="tooltip" title="Departments" data-placement="top"><i class="fas fa-network-wired"></i></button>
                </nav>

                <form id='create-department-form' action='#' method='post'>
                    <div class="container-fluid mt-0 mt-md-n5">
                        <div class="row justify-content-center text-md-left py-2 md-mb-1 info-panel">
                            <div class="col-10 col-md-6 rounded pt-2 data-panel">
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
        
        let depObj = $(this).serializeObject();
        let formData = JSON.stringify(depObj);

        if (!departments.includes(depObj.name)) {
            departments.push(depObj.name);

            $.ajax({
                url: "http://localhost/company-directory/api/department/create.php",
                type : "POST",
                contentType : 'application/json',
                data : formData,
                success : function(result) {
                    showDepartment();
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        } else {
            $('#alertMsg').modal('show');
        }
        
        return false;
    });
});
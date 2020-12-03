$(document).ready(function(){
 
    let obj = undefined;

    $(document).on('click', '.update-department-btn', function(){

        $('.tooltip').remove();
        let id = $(this).attr('data-id');
        obj = JSON.parse($(this).attr('data-obj'));

        $.getJSON("http://localhost/company-directory/api/department/readOne.php?id=" + id, function(data){
        
            let name = data.name;
            let locationId = data.locationId;
            
            $.getJSON("http://localhost/company-directory/api/location/read.php", function(data) {
            
                let locationOptionsHtml = `<select name='locationId' id="location" class="form-control">`;

                $.each(data.records, function(key, value) {

                    if (value.id == locationId) {
                        locationOptionsHtml += `<option value='${value.id}' selected>${value.name}</option>`;
                    } else {
                        locationOptionsHtml += `<option value='${value.id}'>${value.name}</option>`;
                    }
                });

                locationOptionsHtml += '</select>';

                let updateDepartmentHtml = `
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

                    <form id='update-department-form' action='#' method='post'>
                        <div class="container-fluid mt-0 mt-md-n5">
                            <div class="row justify-content-center text-md-left py-2 md-mb-1 info-panel">
                                <div class="row justify-content-center text-md-left py-2 md-mb-1 info-panel">
                                    <div class="col-10 col-md-12 rounded data-panel pt-2">
                                        <label class="sr-only" for="name">Name</label>
                                        <label class="sr-only" for="location">Location</label>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text"><i class="fas fa-network-wired"></i></div>
                                            </div>
                                            <input class="form-control" type='text' name='name' id="name" placeholder="Department name" value="${name}" required />
                                            <input class="form-control" type='hidden' name='id' value="${id}" />
                                            ${locationOptionsHtml}
                                            <div class="input-group-append">
                                                <button class="btn btn-sm btn-outline-warning text-uppercase" type="submit">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
               `;

                $("#page-content").html(updateDepartmentHtml);
                
                changePageTitle("Update department");
            });
        });
    });
     
    $(document).on('submit', '#update-department-form', function(){
        
        let depObj = $(this).serializeObject();
        let formData = JSON.stringify(depObj);

        if (!departmentsArray.some(el => { return el.name === depObj.name && el.locationId === depObj.locationId })) {

            departmentsArray.splice(departmentsArray.findIndex(el => { return el.name === obj.name && el.locationId === obj.locationId }), 1);

            departmentsArray.push({'name': depObj.name, 'locationId': depObj.locationId});

            $.ajax({
                url: "http://localhost/company-directory/api/department/update.php",
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
$(document).ready(function(){

    let depId = undefined;
 
    $(document).on('click', '.update-personnel-btn', function(){

        let id = $(this).attr('data-id');
        depId = $(this).attr('data-depId');

        $('#personModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('body').css('padding-right', 0);

        $.getJSON("http://localhost/company-directory/api/personnel/readOne.php?id=" + id, function(data){
        
            let firstName = data.firstName;
            let lastName = data.lastName;
            let jobTitle = data.jobTitle;
            let email = data.email;
            let departmentId = data.departmentId;
            
            $.getJSON("http://localhost/company-directory/api/department/read.php", function(data) {
            
                let departmentOptionsHtml = `<select name='departmentId' id="department" class="form-control">`;

                $.each(data.records, function(key, value) {

                    if (value.id == departmentId) {
                        departmentOptionsHtml += `<option value='${value.id}' selected>${value.name}</option>`;
                    } else {
                        departmentOptionsHtml += `<option value='${value.id}'>${value.name}</option>`;
                    }
                });
                departmentOptionsHtml += '</select>';

                let updatePersonnelHtml = `
                    <!-- MODAL -->
                    <div class="modal fade" id="updateModalConfirmation" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="updateModalLabel">Update person</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-warning btn-upd-per">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- NAVBAR -->
                    <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
                        <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
                        <button id="read-personnel" class="btn btn-outline-light btn-sm mr-auto read-personnel-btn" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>
                    </nav>

                    <form id='update-personnel-form' action='#' method='post'>
                        <div class="container-fluid mt-0 mt-md-n5">
                            <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 info-panel">
                                <div class="col-11 col-sm-9 col-md-6 col-lg-5 rounded-top data-panel">
                                    <label class="sr-only" for="firstName">First Name</label>
                                    <label class="sr-only" for="lastName">Last Name</label>
                                    <div class="input-group my-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fas fa-user"></i></div>
                                        </div>
                                        <input class="form-control" type='text' name='firstName' id="firstName" placeholder="First Name" value="${firstName}" required />
                                        <input class="form-control" type='text' name='lastName' id="lastName" placeholder="Last Name" value="${lastName}" required />
                                    </div>
                                </div>
                                <div class="w-100 d-md-block d-none"></div>
                                <div class="col-11 col-sm-9 col-md-6 col-lg-5 data-panel">
                                    <label class="sr-only" for="department">Department</label>
                                    <label class="sr-only" for="jobTitle">Department</label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fas fa-network-wired"></i></div>
                                        </div>
                                        ${departmentOptionsHtml}
                                        <input class="form-control" type='text' name='jobTitle' id="jobTitle" placeholder="Job Title" value="${jobTitle}" required />
                                    </div>
                                </div>
                                <div class="w-100 d-md-block d-none"></div>
                                <div class="col-11 col-sm-9 col-md-6 col-lg-5 rounded-bottom data-panel">
                                    <label class="sr-only" for="email">Email</label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fas fa-envelope"></i></div>
                                        </div>
                                        <input class="form-control" type='text' name='email' placeholder="Email" value="${email}" required />
                                        <input class="form-control" type='hidden' name='id' value="${id}" />
                                        <div class="input-group-append">
                                            <button class="btn btn-sm btn-outline-warning text-uppercase" type="submit">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
               `;

                $("#page-content").html(updatePersonnelHtml);
                
                changePageTitle("Update person");
            });
        });
    });
     
    $(document).on('submit', '#update-personnel-form', function(e){

        perObj = $(this).serializeObject();        
        perFormData = JSON.stringify(perObj);

        e.preventDefault();

        $('#updateModalConfirmation').modal('show');
        
    });

    $(document).on('click', '.btn-upd-per', function(e) { 
        
        departmentsActiveArray.splice(departmentsActiveArray.indexOf(depId), 1);
        departmentsActiveArray.push(perObj.departmentId);

        $.ajax({
            url: "http://localhost/company-directory/api/personnel/update.php",
            type : "POST",
            contentType : 'application/json',
            data : perFormData,
            success : function(result) {
                showPersonnel();
                $('#updateModalConfirmation').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $('body').css('padding-right', 0);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
        
        return false;
    });
});
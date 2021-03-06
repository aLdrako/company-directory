$(document).ready(function(){

    $(document).on('click', '.create-personnel-btn', function(){

        $('.tooltip').remove();

        $.getJSON("http://localhost/company-directory/api/department/read.php", function(data){
        
            let departmentOptionsHtml = `<select name='departmentId' id="department" class="form-control">`;

            $.each(data.records, function(key, value){
                departmentOptionsHtml += `<option value='${value.id}'>${value.name}</option>`;
            });

            departmentOptionsHtml += `</select>`;

            let createPersonnelHtml = ` 
                <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
                    <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
                    <button id="read-personnel" class="btn btn-outline-light btn-sm mr-auto read-personnel-btn" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>
                </nav>

                <form id='create-personnel-form' action='#' method='post'>
                    <div class="container-fluid mt-0 mt-md-n5">
                        <div class="row justify-content-center text-md-left py-2 md-mb-1 info-panel">
                            <div class="col-11 col-sm-9 col-md-6 col-lg-5 rounded-top data-panel">
                                <label class="sr-only" for="firstName">First Name</label>
                                <label class="sr-only" for="lastName">Last Name</label>
                                <div class="input-group my-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-user"></i></div>
                                    </div>
                                    <input class="form-control" type='text' name='firstName' id="firstName" placeholder="First Name" required />
                                    <input class="form-control" type='text' name='lastName' id="lastName" placeholder="Last Name" required />
                                </div>
                            </div>
                            <div class="w-100 d-md-block d-none"></div>
                            <div class="col-11 col-sm-9 col-md-6 col-lg-5 data-panel">
                                <label class="sr-only" for="department">Department</label>
                                <label class="sr-only" for="jobTitle">Job Title</label>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-network-wired"></i></div>
                                    </div>
                                    ${departmentOptionsHtml}
                                    <input class="form-control" type='text' name='jobTitle' id="jobTitle" placeholder="Job Title" required />
                                </div>
                            </div>
                            <div class="w-100 d-md-block d-none"></div>
                            <div class="col-11 col-sm-9 col-md-6 col-lg-5 rounded-bottom data-panel">
                                <label class="sr-only" for="email">Email</label>
                                <div class="input-group mb-2">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fas fa-envelope"></i></div>
                                    </div>
                                    <input class="form-control" type='text' name='email' placeholder="Email" required />
                                    <div class="input-group-append">
                                        <button class="btn btn-sm btn-outline-warning text-uppercase" type="submit">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            `;

            $("#page-content").html(createPersonnelHtml);
            
            changePageTitle("Add person");
        });
    });
 
    $(document).on('submit', '#create-personnel-form', function(){

        let perObj = $(this).serializeObject();        
        let formData = JSON.stringify(perObj);

        departmentsActiveArray.push(perObj.departmentId);

        $.ajax({
            url: "http://localhost/company-directory/api/personnel/create.php",
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
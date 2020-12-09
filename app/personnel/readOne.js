$(document).ready(function(){
 
    $(document).on('click', '.read-one-personnel-btn', function(){

        let id = $(this).attr('data-id');

        $.getJSON("http://localhost/company-directory/api/personnel/readOne.php?id=" + id, function(data){

            let readOnePersonHtml = `
                <div class="container-fluid">
                    <div class="row justify-content-center text-center py-3 info-panel-one">
                        <div class="col-10 align-self-center rounded-top data-panel-one pt-1"><i class="fas fa-user"></i> ${data.firstName} ${data.lastName}</div>
                        <div class="w-100"></div>
                        <div class="col-10 align-self-center data-panel-one"><i class="fas fa-address-card"></i> ${data.jobTitle}</div>
                        <div class="w-100"></div>
                        <div class="col-10 align-self-center text-truncate data-panel-one"><i class="fas fa-envelope"></i> ${data.email}</div>
                        <div class="w-100"></div>
                        <div class="col-10 align-self-center data-panel-one"><i class="fas fa-network-wired"></i> ${data.department}</div>
                        <div class="w-100"></div>
                        <div class="col-10 align-self-center data-panel-one"><i class="fas fa-map-marker-alt"></i> ${data.location}</div>
                        <div class="w-100"></div>
                        <div class="col-10 align-self-center text-nowrap rounded-bottom py-2 data-panel-one">
                            <button class="btn btn-info btn-sm update-personnel-btn" data-id="${data.id}" data-depId="${data.departmentId}"><i class="far fa-edit"></i></button>
                            <button class="btn btn-danger btn-sm delete-personnel-btn" data-id="${data.id}" data-depId="${data.departmentId}"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            `;

            $('#personModal .modal-body').html(readOnePersonHtml);
            $('#personModal').modal('show');
        });
    });
 
});
$(document).ready(function(){

    let locName = undefined;
 
    $(document).on('click', '.update-location-btn', function(){

        $('.tooltip').remove();
        let id = $(this).attr('data-id');
        locName = $(this).attr('data-name');

        $.getJSON("http://localhost/company-directory/api/location/readOne.php?id=" + id, function(data){
        
            let name = data.name;

                let updateLocationHtml = `
                    <!-- MODAL -->
                    <div class="modal fade" id="updateModalConfirmation" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="updateModalLabel">Update location</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body d-none">
                                    <div class="alert alert-danger text-center">   
                                        <strong>Location with this name already exists!</strong>   
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-warning btn-upd-loc">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <!-- NAVBAR -->
                    <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
                        <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
                        <button id="read-personnel" class="btn btn-outline-light btn-sm read-personnel-btn" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>
                        <button id="read-department" class="btn btn-outline-light btn-sm ml-1 mr-auto read-location-btn"  data-toggle="tooltip" title="Locations" data-placement="top"><i class="fas fa-map-marker-alt"></i></button>
                    </nav>

                    <form id='update-location-form' action='#' method='post'>
                        <div class="container-fluid mt-0 mt-md-n5">
                            <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 info-panel">
                                <div class="col-11 col-sm-8 col-md-6 col-lg-5 rounded data-panel pt-2">
                                    <label class="sr-only" for="name">Name</label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fas fa-map-marker-alt"></i></div>
                                        </div>
                                        <input class="form-control" type='text' name='name' id="name" placeholder="Location name" value="${name}" required />
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

                $("#page-content").html(updateLocationHtml);
                
                changePageTitle("Update location");
        });
    });
     
    $(document).on('submit', '#update-location-form', function(e){
        
        locObj = $(this).serializeObject();
        locFormData = JSON.stringify(locObj);

        e.preventDefault();

        $('#updateModalConfirmation .modal-body').addClass('d-none');
        $('#updateModalConfirmation').modal('show');

    });

    $(document).on('click', '.btn-upd-loc', function(e) { 

        if (!locationsArray.includes(locObj.name)) {

            locationsArray.splice(locationsArray.indexOf(locName), 1);
            locationsArray.push(locObj.name);

            $.ajax({
                url: "http://localhost/company-directory/api/location/update.php",
                type : "POST",
                contentType : 'application/json',
                data : locFormData,
                success : function(result) {
                    showLocation();
                    $('#updateModalConfirmation').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $('body').css('padding-right', 0);
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        } else {
            $('#updateModalConfirmation .modal-body').removeClass('d-none');
        }
        
        return false;
    });
});
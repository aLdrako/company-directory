$(document).ready(function(){

    $(document).on('click', '.create-location-btn', function() {

        $('.tooltip').remove();

        let createLocationHtml = `
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
                <button id="read-location" class="btn btn-outline-light btn-sm ml-1 mr-auto read-location-btn"  data-toggle="tooltip" title="Locations" data-placement="top"><i class="fas fa-map-marker-alt"></i></button>
            </nav>

            <form id='create-location-form' action='#' method='post'>
                <div class="container-fluid mt-0 mt-md-n5">
                    <div class="row justify-content-center text-md-left py-2 md-mb-1 info-panel">
                        <div class="col-11 col-sm-8 col-md-6 col-lg-5 rounded data-panel pt-2">
                            <label class="sr-only" for="name">Name</label>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i class="fas fa-map-marker-alt"></i></div>
                                </div>
                                <input class="form-control" type='text' name='name' id="name" placeholder="Location name" required />
                                <div class="input-group-append">
                                    <button class="btn btn-sm btn-outline-warning text-uppercase" type="submit">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `;

        $("#page-content").html(createLocationHtml);
        
        changePageTitle("Add location");

    });
 
    $(document).on('submit', '#create-location-form', function(){
        
        let locObj = $(this).serializeObject();
        let formData = JSON.stringify(locObj);

        if (!locationsArray.includes(locObj.name)) {
            locationsArray.push(locObj.name);

            $.ajax({
                url: "http://localhost/company-directory/api/location/create.php",
                type : "POST",
                contentType : 'application/json',
                data : formData,
                success : function(result) {
                    showLocation();
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
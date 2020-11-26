$(document).ready(function(){
 
    $(document).on('click', '.update-location-btn', function(){

        $('.tooltip').remove();
        let id = $(this).attr('data-id');

        $.getJSON("http://localhost/company-directory/api/location/readOne.php?id=" + id, function(data){
        
            let name = data.name;

                let updateLocationHtml = `
                    <nav id="navbar" class="navbar navbar-expand-md fixed-top navbar-dark">
                        <a class="navbar-brand" href="#"><h4 class="page-title"></h4></a>
                        <button id="read-personnel" class="btn btn-outline-light btn-sm read-personnel-btn" data-toggle="tooltip" title="Show all entries" data-placement="top"><i class="fas fa-list"></i></button>
                        <button id="read-department" class="btn btn-outline-light btn-sm ml-1 mr-auto read-location-btn"  data-toggle="tooltip" title="Locations" data-placement="top"><i class="fas fa-map-marker-alt"></i></button>
                    </nav>

                    <form id='update-location-form' action='#' method='post'>
                        <div class="container-fluid">
                            <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 info-panel">
                                <div class="row justify-content-center text-center text-md-left py-2 md-mb-1 info-panel">
                                    <div class="col-10 col-md-12 rounded data-panel pt-2">
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
                        </div>
                    </form>
               `;

                $("#page-content").html(updateLocationHtml);
                
                changePageTitle("Update location");
        });
    });
     
    $(document).on('submit', '#update-location-form', function(){
        
        let formData = JSON.stringify($(this).serializeObject());

        $.ajax({
            url: "http://localhost/company-directory/api/location/update.php",
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
        
        return false;
    });
});
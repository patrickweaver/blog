$('document').ready(function(){

  // New Post:

  // Generate slug
  // From: https://gist.github.com/mathewbyrne/1280286

  function slugify(text) {
    slug = text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
    slug = capAt1024(slug);
    return slug;
  }

  function capAt1024(text) {
    if (text.length > 1024) {
      text = text.substr(0, 1024);
      if (text[1023] === "-") {
        text = text.substr(0, 1024);
      }
    }
    return text;
  }

  // Auto populate slug on writing in title field
  $( "#new-post-title" ).keyup(function() {
    $( "#new-post-slug" ).val(slugify($( this ).val()));
    $( this ).val(capAt1024($( this ).val()));
  });
  // And in slug field
  $( "#new-post-slug" ).keyup(function() {
    $( "#new-post-slug" ).val(slugify($( this).val()));
  });

  $( "#new-post-form > .submit").click(function(event) {
    event.preventDefault();
    postAPI("/posts/new/");
  });


  function postAPI(path) {
    // API url is passed from environment variable to front end via local
    var apiUrl = $( "#apiUrl" ).html();
    //var apiUrl = "http://localhost:8000/blog/posts/"
    // Grab post data from the form:
    var apiData = {
      title: capAt1024($( "#new-post-title" ).val()),
      slug: slugify($( "#new-post-slug").val()),
      post_date: $( "#new-post-date" ).val(),
      body: $( "#new-post-body" ).val()
    }
    console.log("API URL: " + apiUrl + path);
    $.ajax({
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      //contentType: "application/x-www-form-urlencoded",
      url: apiUrl + path,
      data: JSON.stringify(apiData),
      //data: apiData,
      success: function(data) {
        console.log(data);
        //alert("Posted!");
        location.href="/";
      },
      error: function(xhr, status, err, a) {
        console.log("Error: " + err + " -- Status: " + status);
      }
    });
  }

});

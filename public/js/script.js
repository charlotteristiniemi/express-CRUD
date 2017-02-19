

function addNewStory() {
	window.location.href = '/add_new_story';
}

function cancelAdd() {
	window.location.href = '/';
}

function changeStory(id) {
	window.location.href = '/edit_story/'+id;
}

function deleteStory(id) {
	window.location.href = '/delete_story/'+id;
}

function postStory() {
	
	$.ajax({
		url: "/add_new_story",
		type: "post",
		data:$("input, select, textarea").serialize(),
    success:function(res){
      // window.location.href('/');
      console.log(res);
      swal("OK!", "Du har nu lagt till en ny historia", "success");
      return false;
    },
	  error: function(){
	    alert('failure');
	  }
	});
}

function putStory(id) {

	$.ajax({
		url: "/edit_story/"+id,
		type: "put",
		data:$("input, select, textarea").serialize(),
    success:function(res){
      //window.location.reload();
      swal("OK!", "Du har nu uppdaterat en historia", "success");
			//alert('Du har nu uppdaterat en historia!');
      return false;
    },
	  error: function(){
	    alert('failure');
	  }
	});
}
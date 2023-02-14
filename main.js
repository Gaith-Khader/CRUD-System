var courseName=document.getElementById("courseName");
var courseCategory=document.getElementById("courseCategory");
var coursePrice=document.getElementById("coursePrice");
var courseDescription=document.getElementById("courseDescription");
var addBtn=document.getElementById("addBtn");
var deleteBtn=document.getElementById("deleteBtn");
var search=document.getElementById("search");
var tableBody=document.getElementById("tableBody");
var currentIndex=[];
var courses;



// local storage
if (JSON.parse(localStorage.getItem('courses'))==null){
    courses=[];
}else{
    courses=JSON.parse(localStorage.getItem('courses'));
}
display();


// add course
addBtn.onclick=function(e){
    e.preventDefault();
    if(addBtn.innerHTML=="Add Course"){
        addCourse();
    }else if(addBtn.innerHTML=="Update Course"){
        updateCourse();
    }

}
function addCourse(){
    var course={
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        description:courseDescription.value,
    }
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses));
    display()
    clearInputs();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Course Added Successfully',
        showConfirmButton: false,
        timer: 1500
    })
}

// clear inputs
function clearInputs(){
    courseName.value= '';
    courseCategory.value= '';
    coursePrice.value= '';
    courseDescription.value= '';

    courseName.classList.remove("is-valid");
    courseCategory.classList.remove("is-valid");
    coursePrice.classList.remove("is-valid");
    courseDescription.classList.remove("is-valid");
}

// display data
function display(){
    var data='';
    for(i=0;i<courses.length;i++){
        data +=`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].name}</td>
        <td>${courses[i].category}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].description}</td>
        <td><a href="#" class="btn btn-primary" onclick="editCourse(${i})">Edit</a></td>
        <td><a href="#" class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML=data;
}

// delete

// delete course
function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1);
            display();
            localStorage.setItem('courses',JSON.stringify(courses));
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
        }
    })

}
// delete all
deleteBtn.onclick=function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            tableBody.innerHTML='';
            localStorage.setItem('courses',JSON.stringify(courses));
            display();
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
        }
    })

}


// search
search.onkeyup=function(){
    var data='';
    var searchKey=search.value;
    for(i=0;i<courses.length;i++){
        if(courses[i].name.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || courses[i].category.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())){
            data +=`
            <tr>
            <td>${i+1}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td><a href="#" class="btn course-add">Edit</a></td>
            <td><a href="#" class="btn dlt-btn" onclick="deleteCourse(${i})">Delete</button></td>
            </tr>
            `
        }
    }
    tableBody.innerHTML=data;
}

// update course
function editCourse(index){
    console.log(index);
    courseName.value= courses[index].name;
    courseCategory.value= courses[index].category;
    coursePrice.value= courses[index].price;
    courseDescription.value= courses[index].description;

    addBtn.innerHTML="Update Course";
    currentIndex=index;
}

function updateCourse(){
    var uCourse={
        name:courseName.value,
        category:courseCategory.value,
        price:coursePrice.value,
        description:courseDescription.value,
    }
    var oldName=courses[currentIndex].name;

    courses[currentIndex]=uCourse;
    display();
    localStorage.setItem('courses',JSON.stringify(courses));

    clearInputs();
    addBtn.innerHTML="Add Course";
    
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${oldName} Updated Successfully`,
        showConfirmButton: false,
        timer: 1500
    })

}


// validation
// regex

courseName.onkeyup=function(){
    var pattern=/^[A-Z][a-z]{2,10}$/;
    if(pattern.test(courseName.value)){
        courseName.classList.add("is-valid");
        courseName.classList.replace("is-invalid","is-valid");

        addBtn.removeAttribute("disabled");
    }else{
        courseName.classList.add("is-invalid");
        courseName.classList.replace("is-valid","is-invalid");

        addBtn.setAttribute('disabled','disabled');
    }
}

courseCategory.onkeyup=function(){
    var pattern=/^[A-Z][a-z]{2,20}$/;
    if(pattern.test(courseCategory.value)){
        courseCategory.classList.add("is-valid");
        courseCategory.classList.replace("is-invalid","is-valid");

        addBtn.removeAttribute("disabled");
    }else{
        courseCategory.classList.add("is-invalid");
        courseCategory.classList.replace("is-valid","is-invalid");

        addBtn.setAttribute('disabled','disabled');
    }
}


coursePrice.onkeyup=function(){
    var pattern=/^[0-9]{2,3}$/;
    if(pattern.test(coursePrice.value)){
        coursePrice.classList.add("is-valid");
        coursePrice.classList.replace("is-invalid","is-valid");

        addBtn.removeAttribute("disabled");
    }else{
        coursePrice.classList.add("is-invalid");
        coursePrice.classList.replace("is-valid","is-invalid");

        addBtn.setAttribute('disabled','disabled');
    }
}

courseDescription.onkeyup=function(){
    var pattern=/^[A-Za-z0-9\s]{10,60}$/;
    if(pattern.test(courseDescription.value)){
        courseDescription.classList.add("is-valid");
        courseDescription.classList.replace("is-invalid","is-valid");

        addBtn.removeAttribute("disabled");
    }else{
        courseDescription.classList.add("is-invalid");
        courseDescription.classList.replace("is-valid","is-invalid");

        addBtn.setAttribute('disabled','disabled');
    }
}

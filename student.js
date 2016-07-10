var $tbody = document.querySelector('.table tbody');
var $add = document.querySelector('.add');
var $remove = document.querySelector('.remove');
var $toggleCheck = document.querySelector('.tg-check');
var students = (localStorage.students) ? (JSON.parse(localStorage.students)) : [];
////////////////////////////////////////////
$add.onclick = function() {
	var xuehao = (students.length) ?(students[students.length-1].id)+1:10001;
	var stu = {
		id: xuehao,
		name: '',
		sex: '',
		age: ''
	}
	students.push(stu) 
	localStorage.students = JSON.stringify(students);
	var tr = document.createElement('tr');
	tr.setAttribute('data_id',stu.id)
	tr.innerHTML = '<td>' + stu.id +'</td><td data_role="name">' + stu.name + '</td><td data_role="sex">' + stu.sex + '</td><td data_role="age">' + stu.age + '</td><td ><input type="checkbox" class="ck"/></td>'
	$tbody.appendChild(tr);
	toggleEdit(tr)
}
var render = function() {
	$tbody.innerHTML=null;

	for (var i = 0; i < students.length; i++) {
		var stu = students[i]
		var tr = document.createElement('tr');
		tr.setAttribute('data_id',stu.id)
		tr.innerHTML = '<td>' + stu.id + 
			'</td><td data_role="name">' + stu.name + '</td><td data_role="sex">' + stu.sex +
			'</td><td data_role="age">' + stu.age + '</td><td ><input type="checkbox" class="ck"/></td>'
		$tbody.appendChild(tr)
	};
}
render();

$remove.onclick=function(){
	var els=$tbody.querySelectorAll('.ck');
	for (var i = 0; i < els.length; i++) {
		if (els[i].checked===true) {
			var xuehao=els[i].parentElement.parentElement.getAttribute('data_id');
			deleteStudent(xuehao);
		};
	};
	$toggleCheck.checked=false;
}
var deleteStudent=function(xuehao){
	xuehao = Number(xuehao);
	var r=[];
	for (var i = 0; i < students.length; i++) {
		if (students[i].id!==xuehao) {
			r.push(students[i])
		};
	}
	students=r;
	localStorage.students=JSON.stringify(students);
	render();
}
$toggleCheck.onclick = function(){
	var els=$tbody.querySelectorAll('.ck');
	for (var i = 0; i < els.length; i++) {
		if ($toggleCheck.checked === true) {
			els[i].checked=true;
			console.log(els[i].checked)
		}else{
			els[i].checked=false;
		}
	}
	
}
var ckhandler=function(){
	var els=$tbody.querySelectorAll('.ck')
	for (var i = 0, j = 0; i < els.length; i++) {
		if (els[i].checked) {
			j+=1;
			console.log(j,els[i].checked)
		}
	}
	$toggleCheck.checked=(j===students.length);
}
$tbody.onclick=function(e){
	var el=e.target;
	if (el.classList.contains('ck')) {
		ckhandler.call(el,e)
	}else if (el.nodeName==='TD') {
		edithandler.call(el,e)
	};
}
/////////////////////////////////////////////////////
var edithandler=function(){
	var els=$tbody.querySelectorAll('.editing');
	for (var i = 0; i < els.length; i++) {
		toggleEdit(els[i]);
	};
	toggleEdit(this.parentElement)
}

var toggleEdit=function(tr){
	var els=tr.querySelectorAll('td[data_role]');
	if (tr.classList.contains('editing')) {
		tr.classList.remove('editing');
		for (var i = 0; i < els.length; i++) {
			var tmp=els[i].querySelector('input').value;
			els[i].innerHTML=tmp;
		};
	}else{
		tr.classList.add('editing');
		for (var i = 0; i < els.length; i++) {
			var tmp=els[i].innerHTML;
			els[i].innerHTML='<input type="text" value='+tmp+'>';
		};
	}
	
}

var updataStudent=function(id,k,v){
	id =Number(id);
	for (var i = 0; i < students.length; i++) {
		if(students[i].id===id){
			students[i][k]=v;
		}
	}
	localStorage.students=JSON.stringify(students)
}
var timerID;
var tips=document.querySelector('.tips')
$tbody.onkeyup=function(e){
	var el=e.target;
	var xuehao=Number(el.parentElement.parentElement.getAttribute('data_id'));
	var key=el.parentElement.getAttribute('data_role');
	
	var value=el.value;
	tips.innerHTML='正在保存···'
	clearTimeout(timerID)
	timerID=setTimeout(function(){
		updataStudent(xuehao,key,value)
		tips.innerHTML='保存成功'
	},200)
}
var $thead=document.querySelector('.table thead');
$thead.onclick=function(e){
	var el=e.target;
	if (el.nodeName==='TH') {
		var sortKey=el.getAttribute('data_role');
		var state=(el.getAttribute('flag')==='true')? true:false;
		el.setAttribute('flag',!state);
		students.sort(function(x,y){
			return state ? (x[sortKey]>y[sortKey]) : (x[sortKey]<y[sortKey])
		})
		render()
	};
	
}















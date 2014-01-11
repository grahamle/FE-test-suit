function TableSort(id) {
  this.tbl = document.getElementById(id);
  if (this.tbl && this.tbl.nodeName == 'TABLE') {
  	this.makeSortable();
  }
}

TableSort.prototype.makeSortable = function() {
  var headings = this.tbl.tHead.rows[0].cells;
  for (var i=0; headings[i]; i++) {
  	
  }
}
module.exports =  {
  locatie : {},
  
  savelocatie : function(locatie){
    this.locatie[locatie.id]= locatie;
  },
  listAlllocatie : function(){
    var rtnValue =[];
    for (var item in this.locatie) {
      rtnValue.push(this.locatie[item]);
    };
    return rtnValue;
  },
  findlocatie : function(id){
    return this.locatie[id];
  }
};
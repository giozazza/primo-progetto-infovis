d3.json("dati.json").then(function(data) {
	console.log(data);
	
	var svg = d3.select("body").append("svg");
	svg.attr("width", 260 * (data.length+1)).attr("height", 350).attr("style", "background-color:#cceeff");
	
	var scale = d3.scaleLinear();
	scale.domain([1, data.length]);
	scale.range([0,260*data.length]);
	
	
	for(let i=0; i<data.length; i++)
	{
		d3.select("body")
		.select("svg")
		.append("g")
		.attr("id", "albero"+i)
		.attr("class", "alberoG")
		.attr("transform", "translate("+scale(i+1)+",50)");
	}
		
	d3.xml("albero.svg").then(da => {
		d3.selectAll(".alberoG").nodes().forEach(n => {
			n.append(da.documentElement.cloneNode(true))
		})
		
		
		data.forEach(function(el, index){
			console.log(el);
			Object.keys(el).forEach(function(e){
				console.log(e);
				
				svg.select("#albero"+index)
				.select("svg").select("#alberoDiNatale")
				.select("#palle")
				.select("#palla"+e)
				.attr("rx", el[e]/26)
				.attr("ry", el[e]/26);
				
				svg.select("#albero"+index)
				.select("svg")
				.select("#alberoDiNatale")
				.select("#palle")
				.select("#palla"+e)
				.on("click", function(){ 
					indice = this.id.substring(5, 6);
					console.log(indice);
					var lista = [];
					data.forEach(function(el, index){
						lista.push({ key: index, val: el[indice] });
					});
					console.log(lista);
					lista = lista.sort(function (a, b) {
						 return b.val - a.val;
					});
					console.log(lista);
					lista.forEach(function(el, index){
						d3.select("body").select("svg")
						.select("#albero"+el.key)
						.transition().duration(2500)
						.attr("transform", "translate("+scale(index+1)+",50)")});
					});
					
			});
		});
		
	});
	
	})
	.catch(function(error) {
		console.log(error)
});
			
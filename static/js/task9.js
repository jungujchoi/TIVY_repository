			var w_cell = 45;
			var h_cell = 45;
			var ind;
			var celldata;
			var mat = [];
			var drawBoxC, drawBoxR;
			var mouseEvt = 1;
			var userlog = [];
			
			var highlighted = [1,3,0];
			var relations = [[0,2],[0,4],[2,3]];
			var target = 0;
			var sequence = 0;
			var colors = ['red', 'magenta', 'blue', 'none'];	
			
			var statements = [];
			var ans = [];
			
			var rand = [];
			var rand2 = [];	
			while (rand.length <= 4){
				var numb = Math.round(Math.random()*4);
				if (rand.indexOf(numb) == -1) rand.push(numb)

			}
			while (rand2.length <= 4){
				var numb2 = Math.round(Math.random()*4) + 1;
				var numb3 = Math.round(Math.random()*4) + 1;
				var str = numb2 + '_' + numb3;
				var str2 = numb3 + '_' + numb2;
				if (numb2 != numb3){
					if (rand2.indexOf(str) == -1 && rand2.indexOf(str2) == -1) rand2.push(str);
				} 				
			}
			var rorder = [];
			for (var i = 0; i < rand2.length; i++){
				rorder[i] = [];
				rorder[i][0] = parseInt(rand2[i].split('_')[0]);
				rorder[i][1] = parseInt(rand2[i].split('_')[1]);
			}			
			var nameBank = ['John', 'Nathan', 'Kevin', 'Philip', 'Sue'];
			var names = [' ',' ',' ',' ',' '];
			for (var i = 0; i < 5; i++){
				names[rand[i]] = nameBank[i];
			}			

			var numbExist = 5;
			
			// John = 1;
			// Nathan = 2;
			// Kevin = 3;
			// Philip = 4;
			// Sue = 5;
			//John and Kevin are friends;
			ans[0] = [rorder[0][0],rorder[0][1]];

			statements[0] = names[ans[0][0]-1] + " and "+ names[ans[0][1]-1] + " are friends";
			
			
			//Kevin and Sue are friends;
			ans[1] = [rorder[1][0],rorder[1][1]];
		
			statements[1] = names[ans[1][0]-1] + " and "+ names[ans[1][1]-1] + " are friends";
					
			 
			//Sue and Nathan are not friends; 
			//Nathan and Kevin are friends; 
			ans[2] = [rorder[2][0],rorder[2][1]];
	
			statements[2] = names[ans[2][0]-1] + " and "+ names[ans[2][1]-1] + " are friends";
						
			
			//Sue and Philip are friends; 
			
			ans[3] = [rorder[3][0],rorder[3][1]];
		
			statements[3] = names[ans[3][0]-1] + " and "+ names[ans[3][1]-1] + " are friends";		
			
			//Kevin and Philip are friends
			ans[4] = [rorder[4][0],rorder[4][1]];

			statements[4] = names[ans[4][0]-1] + " and "+ names[ans[4][1]-1] + " are friends";
			
			statements[5] = 'Great job!'


			var mat = [];
			for (var i = 0; i < ans.length; i++){
				mat[i] = [];
				for (var j = 0; j < ans.length; j++){
					mat[i][j] = 0;
				}
			}

			mat[rorder[0][0]-1][rorder[0][1]-1] = 1;
			mat[rorder[0][1]-1][rorder[0][0]-1] = 1;

			mat[rorder[1][0]-1][rorder[1][1]-1] = 1;
			mat[rorder[1][1]-1][rorder[1][0]-1] = 1;	

			mat[rorder[2][0]-1][rorder[2][1]-1] = 1;
			mat[rorder[2][1]-1][rorder[2][0]-1] = 1;		

			mat[rorder[3][0]-1][rorder[3][1]-1] = 1;
			mat[rorder[3][1]-1][rorder[3][0]-1] = 1;	

			mat[rorder[4][0]-1][rorder[4][1]-1] = 1;
			mat[rorder[4][1]-1][rorder[4][0]-1] = 1;

			var counter = 1;
			var canvas = d3.select('#visualization');	
			var svg = d3.select('#visualization').append('g').attr('transform', 'translate(400,50)'); 
			canvas.append('rect')
				.attr('x', 350)
				.attr('y', 25)
				.attr('width', 775)
				.attr('height', 325)
				.attr('style', 'stroke: black; stroke-width: 3; fill: none')
			canvas.append('text')
				.attr('x', 50).attr('y', 50)
				.text('Possible number of links: 10');	
			var exist = canvas.append('text')
				.attr('id', 'exist')
				.attr('x', 50).attr('y', 70)
				.attr('style', 'font-weight: 900; fill: black;')
				.text('Number of existing links: 5');
			var density = canvas.append('text')
				.attr('id', 'density')
				.attr('x', 50).attr('y', 90)
				.attr('style', 'font-weight: 900; fill: black;')
				.text('Network Density: 0.5');				


			var nodeExample = canvas.append('text')
				.attr('id', 'nodeExample')
				.attr('x', 50).attr('y', 130)
				.attr('style', 'font-weight: 900; fill: orange;')
				.text('Selected Node: ');				
			var nodeDC = canvas.append('text')
				.attr('id', 'DC')
				.attr('x', 50).attr('y', 150)
				.attr('style', 'font-weight: 900; fill: orange;')
				.text('Degree Centrality: ');	
				
				// draw node-link diagram
				var r = 100;
				var mid_x = 900;
				var mid_y = 200;
				var dim = ans.length; 
				var phi = Math.PI*2/dim;
				var p_x = [];
				var p_y = [];
				for (var i = 0; i < dim; i++){
					p_x[i] = mid_x + r*Math.cos(phi*i);
					p_y[i] = mid_y + r*Math.sin(phi*i);
					canvas.append('circle')
						.attr('r', 2)
						.attr('style', 'fill: black')
						.attr('cx', p_x[i])
						.attr('cy', p_y[i]);
				}
				for (var i = 0; i < dim; i++){
					for (var j = i+1; j < dim; j++){
						if (mat[i][j] == 1){
							canvas.append('line')
								.attr('id', 'line' + i+'_'+j)
								.attr('class','links')
								.attr('x1', p_x[i]).attr('y1', p_y[i])
								.attr('x2', p_x[j]).attr('y2', p_y[j])
								.attr('style', function(){
									var ind1 = relations[sequence][0];
									var ind2 = relations[sequence][1];
									//if ((i == ind1 && j == ind2) || (i == ind2 && j == ind1)){
										//return 'stroke: ' + colors[sequence] + '; stroke-width: 4px;';
									//} else {
										return 'stroke: black; stroke-width: 4px;';
									//}
									
								});
						}
					}
				}			
				var rx = 35;
				var ry = 35;							
				for (var i = 0; i < dim; i++){
					p_x[i] = mid_x + r*Math.cos(phi*i);
					p_y[i] = mid_y + r*Math.sin(phi*i);
					canvas.append('ellipse').attr('class', 'nodeLabel')
						.attr('id', 'nodeLabel_'+i)
						.attr('rx', rx)
						.attr('ry', ry)
						.attr('style', function(){
							var str;
							if (i == 1){
								return 'stroke: black; stroke-width: 2;fill: white';
							}
							else {
								return 'stroke: black; stroke-width: 2;fill: white';
							}
						})
						.attr('cx', p_x[i])
						.attr('cy', p_y[i]);
				}
				
				for (var i = 0; i < dim; i++){
					p_x[i] = mid_x + r*Math.cos(phi*i);
					p_y[i] = mid_y + r*Math.sin(phi*i);
					canvas.append('text').attr('class', 'nodeLabel')
						.attr('id', 'nodeLabel' + i)
						//.attr('r', 2)
						.attr('style', function(){
							if (i == 1){
								return 'text-anchor: middle; fill: black';
							} else {
								return 'text-anchor: middle; fill: black';
							}
							
						})
						.attr('x', p_x[i])
						.attr('y', p_y[i] + 12/2)
						.text(names[i]);
				}	

				d3.selectAll('.nodeLabel').on('mousedown', function(){
					var str = this.getAttribute('id');
					if (str.split('_').length == 2){
						// circle clicked
						var id = str.split('_')[1];
						var id2 = '_' + id;
					} else {
						// label clicked
						var id = str.split('nodeLabel')[1];
						var id2 = '_' + id;
					}
					d3.selectAll('ellipse')
						.attr('style', 'stroke: black; stroke-width: 2;fill: white');
					d3.select('#nodeLabel_' + id)
						.attr('style', 'stroke: orange; stroke-width: 2;fill: white');
						
					for (var i = 0; i < dim; i++){
						d3.select('#nodeLabel'+i)
							.attr('style', 'text-anchor: middle; fill: black');
					}
					d3.select('#nodeLabel' + id)
						.attr('style', 'text-anchor: middle; font-weight: 900; fill: orange');
					
					var DC = 0;
					var lines = [];
					for (var i = 0; i < dim; i++){
						if (mat[id][i] == 1){
							DC++;
							lines.push(i);
						}
					}
					
					d3.selectAll('line')
						.attr('style', 'stroke: black; stroke-width: 4px;');
					for (var i = 0; i < lines.length; i++){
						d3.select('#line' + id + '_' + lines[i])
							.attr('style', 'stroke: orange; stroke-width: 4px;');
						d3.select('#line' + lines[i] + '_' + id)
							.attr('style', 'stroke: orange; stroke-width: 4px;');							
					}

					
					for (var i = 0; i < dim; i++){
						for (var j = 0; j < dim; j++){
							var str = document.getElementById('cell(' + i + ',' + j + ')')
								.getAttribute('style').split(':');
							var color = str[str.length-1];
							
							document.getElementById('cell(' + i + ',' + j + ')')
								.setAttribute('style', 'stroke: black; stroke-width: 4; opacity: 1; fill:' + color);
							document.getElementById('cell(' + j + ',' + i + ')')
								.setAttribute('style', 'stroke: black; stroke-width: 4; opacity: 1; fill:' + color);							
														
						}
					}
					
					for (var i = 0; i < dim; i++){
						var str = document.getElementById('cell(' + i + ',' + id + ')')
							.getAttribute('style').split(':');
						var color = str[str.length-1];
						document.getElementById('cell(' + i + ',' + id + ')')
							.setAttribute('style', 'stroke: orange; stroke-width: 4; opacity: 1; fill:' + color);
						document.getElementById('cell(' + id + ',' + i + ')')
							.setAttribute('style', 'stroke: orange; stroke-width: 4; opacity: 1; fill:' + color);							
							
					}


					// update degree centrality
					d3.select('#nodeExample').remove();
						var nodeExample = d3.select('svg').append('text')
							.attr('class', 'noselect')
							.attr('id', 'nodeExample')
							.attr('x', 50).attr('y', 130)
							.attr('style', 'font-weight: 900; fill: orange;')
							.text('Selected Node: ' + names[id]);

					d3.select('#DC').remove();
					var nodeDC = canvas.append('text')
						.attr('id', 'DC')
						.attr('x', 50).attr('y', 150)
						.attr('style', 'font-weight: 900; fill: orange;')
						.text('Degree Centrality: ' + DC);
					
						
					var asdf=0;
				});
					
				
				


				var xt_1 = 65, yt_1 = 45;
				var xt_2 = 65, yt_2 = 65;
				var xt_3 = 65, yt_3 = 85;
				var xt_4 = 65, yt_4 = 105;
				var xt_5 = 65, yt_5 = 125;
				var xt_6 = 65, yt_6 = 25;
				
				var cyg1 = yt_1-15;
				var cyg2 = yt_2-15;
				var cyg3 = yt_3-15;
				var cyg4 = yt_4-15;
				var cyg5 = yt_5-15;
				
				var text_1 = canvas.append('text')
					.attr('class', 'noselect')
					.attr('id', 'statement')
					.attr('x', xt_1).attr('y', yt_1)
					.attr('style', 'font-weight: 900; fill:#008B8B;')
					//.text('1. ' + statements[0]);
				
				var check_1 = canvas.append('g')
					.attr('class','check_mark')
					.attr('transform', 'translate(300,' +  cyg1 + ')')
					.attr('style', 'opacity:0');
				check_1.append('line')
					.attr('x1', 0).attr('y1', 7.5)
					.attr('x2', 7.5).attr('y2', 15)
					.attr('style', 'stroke-width:2.5; stroke:red')
				check_1.append('line')
					.attr('x1', 7.5).attr('y1', 15)
					.attr('x2', 15).attr('y2', 0)
					.attr('style', 'stroke-width:2.5; stroke:red')	
					
					
				var text_2 = canvas.append('text')
					.attr('class', 'noselect')
					.attr('id', 'statement')
					.attr('x', xt_2).attr('y', yt_2)
					.attr('style', 'font-weight: 900; fill:#008B8B;')
					//.text('2. '+ statements[1]);					

				var check_2 = canvas.append('g')
					.attr('class','check_mark')
					.attr('transform', 'translate(300,' +  cyg2 + ')')
					.attr('style', 'opacity:0');
				check_2.append('line')
					.attr('x1', 0).attr('y1', 7.5)
					.attr('x2', 7.5).attr('y2', 15)
					.attr('style', 'stroke-width:2.5; stroke:red')
				check_2.append('line')
					.attr('x1', 7.5).attr('y1', 15)
					.attr('x2', 15).attr('y2', 0)
					.attr('style', 'stroke-width:2.5; stroke:red')	


				var text_3 = canvas.append('text')
					.attr('class', 'noselect')
					.attr('id', 'statement')
					.attr('x', xt_3).attr('y', yt_3)
					.attr('style', 'font-weight: 900; fill:#008B8B;')
					//.text('3. '+ statements[2]);

				var check_3 = canvas.append('g')
					.attr('class','check_mark')
					.attr('transform', 'translate(300,' +  cyg3 + ')')
					.attr('style', 'opacity:0');
				check_3.append('line')
					.attr('x1', 0).attr('y1', 7.5)
					.attr('x2', 7.5).attr('y2', 15)
					.attr('style', 'stroke-width:2.5; stroke:red')
				check_3.append('line')
					.attr('x1', 7.5).attr('y1', 15)
					.attr('x2', 15).attr('y2', 0)
					.attr('style', 'stroke-width:2.5; stroke:red')	

				var text_4 = canvas.append('text')
					.attr('class', 'noselect')
					.attr('id', 'statement')
					.attr('x', xt_4).attr('y', yt_4)
					.attr('style', 'font-weight: 900; fill:#008B8B;')
					//.text('4. '+ statements[3]);					
				
				var check_4 = canvas.append('g')
					.attr('class','check_mark')
					.attr('transform', 'translate(300,' +  cyg4 + ')')
					.attr('style', 'opacity:0');
				check_4.append('line')
					.attr('x1', 0).attr('y1', 7.5)
					.attr('x2', 7.5).attr('y2', 15)
					.attr('style', 'stroke-width:2.5; stroke:red')
				check_4.append('line')
					.attr('x1', 7.5).attr('y1', 15)
					.attr('x2', 15).attr('y2', 0)
					.attr('style', 'stroke-width:2.5; stroke:red')										

				var text_5 = canvas.append('text')
					.attr('class', 'noselect')
					.attr('id', 'statement')
					.attr('x', xt_5).attr('y', yt_5)
					.attr('style', 'font-weight: 900; fill:#008B8B;')
					//.text('5. '+ statements[4]);

				var check_5 = canvas.append('g')
					.attr('class','check_mark')
					.attr('transform', 'translate(300,' +  cyg5 + ')')
					.attr('style', 'opacity:0');
				check_5.append('line')
					.attr('x1', 0).attr('y1', 7.5)
					.attr('x2', 7.5).attr('y2', 15)
					.attr('style', 'stroke-width:2.5; stroke:red')
				check_5.append('line')
					.attr('x1', 7.5).attr('y1', 15)
					.attr('x2', 15).attr('y2', 0)
					.attr('style', 'stroke-width:2.5; stroke:red')	
					
					
				var text_1 = canvas.append('text')
					.attr('class', 'noselect')
					.attr('id', 'warning')
					.attr('x', 25).attr('y', 40)
					.attr('style', 'font-weight: 900; fill: red;')
					.text(' ');	

			
				function arrayToStr(log){
					var str = '';
					for (var i = 0; i < log.length; i++){
						str = str + '[';
						for (var j = 0; j < log[i].length; j++){
							if (j == 0)
							str = str + log[i][j];
							else str= str + ': ' + log[i][j];
						}
						if (i != log.length - 1)
						str = str + ']; ';
						else str = str + ']';
					}
					return str;
				}			
			/*d3.select('svg').append('rect')
				.attr('x', 00)
				.attr('width', 600)
				.attr('height', 600)
				.attr('style', 'opacity: 0.5');*/
			d3.csv("static/data/data2.csv", function(error, data){
				celldata = data;
				var j = 0;
				ind = Object.keys(data[0]);
				

				
				var canvas = svg.append('g').attr('class', 'canvas');
				for (var i = 0; i < data.length; i++){
					for (var j = 0; j < data.length; j++){
						svg.append('rect').attr('class', 'cell')
							.attr('id', 'cell(' + i + ',' + j +')')
							.attr('width', w_cell-3).attr('height', h_cell-3)
							.attr('x', w_cell*(i+1)+1.5)
							.attr('y', h_cell*(j+1)+1.5)
							.attr('style', function(){
								var str;
								if (data[i][ind[j]] == '1'){
									str = 'gray';
								}
								else {
									str = 'white';
								} 
									
								return 'stroke: black; stroke-width: 2; opacity: 1; fill:' + str;
							});
						svg.append('text').attr('class', 'noselect')
							//.attr('id', 'columnLabelText' + i)
						//.attr('x', w_cell*(i+1)+w_cell*1/10).attr('y', h_cell*(9)/10)
							.attr('transform', function(){
							var x = 1*w_cell*(i+1)+w_cell*1/10;
							var y = h_cell*9/10;
							return 'translate(' + x + ',' + y + ')rotate(-45)';
						}).text(function(){return names[i];});		

						svg.append('text').attr('class', 'noselect')
							//.attr('id', 'rowLabelText' + i)
						//.attr('x', w_cell*(i+1)+w_cell*1/10).attr('y', h_cell*(9)/10)
							.attr('transform', function(){
								var x = w_cell*0/10;
								var y = 1*h_cell*(i+1) + 1/2*h_cell;
								return 'translate(' + x + ',' + y + ')';
							})
							.text(function(){return names[i];});								
											
					}

				}
				
				var ver = [];
				var resp = [];
				var val = -1;				
				
				// randomly fill in the matrix
				var rcount = 0;
				/*var fills = [];
				while (fills.length < 3){
					var ind = Math.round(4*Math.random());
					if (fills.indexOf(ind) == -1) 
						fills.push(ind);
				}*/
				var fills = [0, 1, 2, 3, 4];
			
				for (var i = 0; i < fills.length; i++){
					var cx = ans[fills[i]][0]-1;
					var cy = ans[fills[i]][1]-1;
					resp.push(fills[i]);
					document.getElementById('cell(' + cx + ',' + cy + ')')
						.setAttribute('style', 'stroke: black; stroke-width: 2;fill:gray');
					document.getElementById('cell(' + cy + ',' + cx + ')')
						.setAttribute('style', 'stroke: black; stroke-width: 2;fill:gray');
				}				
				
				

				d3.selectAll('.cell').on('mousedown', function(){
					var columnY = parseInt(this.getAttribute('id').split('(')[1].split(')')[0].split(',')[1]);
					var rowX = parseInt(this.getAttribute('id').split('(')[1].split(')')[0].split(',')[0]);
					var id = this.getAttribute('id');
					var style = this.getAttribute('style').split(':');
					var color = style[style.length-1];	
					
					if (columnY != rowX){
						if (color == "gray"){
							this.setAttribute('style', 'stroke: black; stroke-width: 2;fill:white');
							document.getElementById('cell(' + columnY + ',' + rowX + ')')
								.setAttribute('style', 'stroke: black; stroke-width: 2;fill:white');
								
							d3.select('#line' + columnY + '_' + rowX)
								.remove();	
							d3.select('#line' + rowX + '_' + columnY)
								.remove();	
								
							numbExist--;
							mat[columnY][rowX] = 0;
							mat[rowX][columnY] = 0;



					for (var i = 0; i < dim; i++){
						d3.select('#nodeLabel'+i)
							.attr('style', 'text-anchor: middle; fill: black');
					}
					d3.selectAll('ellipse')
						.attr('style', 'stroke: black; stroke-width: 2;fill: white');

					d3.select('#nodeExample').remove();
						var nodeExample = d3.select('svg').append('text')
							.attr('class', 'noselect')
							.attr('id', 'nodeExample')
							.attr('x', 50).attr('y', 130)
							.attr('style', 'font-weight: 900; fill: orange;')
							.text('Selected Node: ');

					d3.select('#DC').remove();
					var nodeDC = d3.select('svg').append('text')
						.attr('id', 'DC')
						.attr('x', 50).attr('y', 150)
						.attr('style', 'font-weight: 900; fill: orange;')
						.text('Degree Centrality: ');
						
					d3.selectAll('line')
						.attr('style', 'stroke: black; stroke-width: 4px;');						
		
							d3.select('#exist').remove();
								var exist = d3.select('svg').append('text')
									.attr('class', 'noselect')
									.attr('id', 'exist')
									.attr('x', 50).attr('y', 70)
									.attr('style', 'font-weight: 900; fill: black;')
									.text('Number of existing links: ' + numbExist);

							d3.select('#density').remove();
								var density = d3.select('svg').append('text')
									.attr('class', 'noselect')
									.attr('id', 'density')
									.attr('x', 50).attr('y', 90)
									.attr('style', 'font-weight: 900; fill: black;')
									.text('Network Density: ' + numbExist/10);

							
																	
							//var text = document.getElementById('exist').childNodes;									
						} else {
							this.setAttribute('style', 'stroke: black; stroke-width: 2;fill:gray');
							document.getElementById('cell(' + columnY + ',' + rowX + ')')
								.setAttribute('style', 'stroke: black; stroke-width: 2;fill:gray');

									var c_x = parseFloat(d3.selectAll('circle')._groups[0][rowX].getAttribute('cx'));
									var c_y = parseFloat(d3.selectAll('circle')._groups[0][rowX].getAttribute('cy'));
									
									var c_x2 = parseFloat(d3.selectAll('circle')._groups[0][columnY].getAttribute('cx'));
									var c_y2 = parseFloat(d3.selectAll('circle')._groups[0][columnY].getAttribute('cy'));
									var theta = Math.atan((c_y2-c_y)/(c_x2-c_x));
									var d_x = Math.abs(35*Math.cos(theta));
									var d_y = Math.abs(35*Math.sin(theta));
									
									var x_1, x_2, y_1, y2;
									if (c_x > c_x2){
										x_1 = c_x2 + d_x;
										x_2 = c_x - d_x;
									 	
									 	if (c_y > c_y2){
									 		y_1 = c_y2 + d_y;
									 		y_2 = c_y - d_y;
									 	} else {
									 		y_1 = c_y2 - d_y;
									 		y_2 = c_y + d_y;									 		
									 	}
									 	
									} else {
										x_1 = c_x + d_x;
										x_2 = c_x2 - d_x; 
									 	if (c_y > c_y2){
									 		y_1 = c_y - d_y;
									 		y_2 = c_y2 + d_y;
									 	} else {
									 		y_1 = c_y + d_y;
									 		y_2 = c_y2 - d_y;									 		
									 	}																				
									}
							mat[columnY][rowX] = 1;
							mat[rowX][columnY] = 1;

							d3.select('svg').append('line')
								.attr('id', 'line' + columnY+'_'+rowX)
								.attr('class','links')
								.attr('x1', x_1).attr('y1', y_1)
								.attr('x2', x_2).attr('y2', y_2)
								.attr('style', function(){
									//var ind1 = relations[sequence][0];
									//var ind2 = relations[sequence][1];
									//if ((i == ind1 && j == ind2) || (i == ind2 && j == ind1)){
										//return 'stroke: ' + colors[sequence] + '; stroke-width: 4px;';
									//} else {
										return 'stroke: black; stroke-width: 4px;';
									//}
									
								});								
								
							numbExist++;
							

					for (var i = 0; i < dim; i++){
						d3.select('#nodeLabel'+i)
							.attr('style', 'text-anchor: middle; fill: black');
					}
					d3.selectAll('ellipse')
						.attr('style', 'stroke: black; stroke-width: 2;fill: white');

					d3.select('#nodeExample').remove();
						var nodeExample = d3.select('svg').append('text')
							.attr('class', 'noselect')
							.attr('id', 'nodeExample')
							.attr('x', 50).attr('y', 130)
							.attr('style', 'font-weight: 900; fill: orange;')
							.text('Selected Node: ');

					d3.select('#DC').remove();
					var nodeDC = d3.select('svg').append('text')
						.attr('id', 'DC')
						.attr('x', 50).attr('y', 150)
						.attr('style', 'font-weight: 900; fill: orange;')
						.text('Degree Centrality: ');
													
					d3.selectAll('line')
						.attr('style', 'stroke: black; stroke-width: 4px;');
							
							d3.select('#exist').remove();
								var exist = d3.select('svg').append('text')
									.attr('class', 'noselect')
									.attr('id', 'exist')
									.attr('x', 50).attr('y', 70)
									.attr('style', 'font-weight: 900; fill: black;')
									.text('Number of existing links: ' + numbExist);							

							d3.select('#density').remove();
								var density = d3.select('svg').append('text')
									.attr('class', 'noselect')
									.attr('id', 'density')
									.attr('x', 50).attr('y', 90)
									.attr('style', 'font-weight: 900; fill: black;')
									.text('Network Density: ' + numbExist/10);
														
						}
					}
					/*var ver = 0;
					var columnY = parseInt(this.getAttribute('id').split('(')[1].split(')')[0].split(',')[1])+1;
					var rowX = parseInt(this.getAttribute('id').split('(')[1].split(')')[0].split(',')[0])+1;
					var id = this.getAttribute('id');
					val = -1;
					var u = 0;
					while (u < ans.length){
						if (ans[u].includes(columnY) && ans[u].includes(rowX) && columnY != rowX && resp.includes(u) == false){
							val = u;
							ver = 0;
							u = 5000;
						} 
						else if (ans[u].includes(columnY) && ans[u].includes(rowX) && columnY != rowX && resp.includes(u)){
							val = -1;
							ver = 1;
							u = 5000;
						} else {
							//val = -2;
						}
						u++;
					}
					
					if (val != -1 && ver == 0){	

						resp.push(val);	

							counter++;
	

							var text = document.getElementById('warning').childNodes;
							document.getElementById('warning').removeChild(text[0]);
							d3.select('#warning').remove();									
							var text_1 = d3.select('#visualization').append('text')
								.attr('class', 'noselect')
								.attr('id', 'warning')
								.attr('x', 25).attr('y', 40)
								.attr('style', 'font-weight: 900; fill: red;')
								.text(' ');		
							
							if (counter == 3) d3.selectAll('.cell').on('mousedown', null);
													
						//} else {
							
							var col = columnY - 1;
							var ro = rowX - 1;
							var original = document.getElementById('cell(' + ro + ',' + col + ')');
							original.setAttribute('style', 'stroke: red; stroke-width:5; fill:gray');
							var duplicate = document.getElementById('cell(' + col + ',' + ro + ')');
							duplicate.setAttribute('style', 'stroke: red; stroke-width:5; fill:gray');							
							
							
							d3.selectAll('.check_mark')._groups[0]

					} else if (ver == 1 && val == -1){
						var text = document.getElementById('warning').childNodes;
						document.getElementById('warning').removeChild(text[0]);
						d3.select('#warning').remove();									
						var text_1 = d3.select('#visualization').append('text')
							.attr('class', 'noselect')
							.attr('id', 'warning')
							.attr('x', xt_6).attr('y', yt_6)
							.attr('style', 'font-weight: 900; fill: red;')
							.text('This relationship has been already found.');								
					} 
					
					else {
						var text = document.getElementById('warning').childNodes;
						document.getElementById('warning').removeChild(text[0]);
						d3.select('#warning').remove();									
						var text_1 = d3.select('#visualization').append('text')
							.attr('class', 'noselect')
							.attr('id', 'warning')
							.attr('x', xt_6).attr('y', yt_6)
							.attr('style', 'font-weight: 900; fill: red;')
							.text('Your selection does not reflect this relatonship.');								
					}
					*/
				});
				
				d3.selectAll('.cell').on('mousemove', function(){
					var r_1 = parseInt(this.getAttribute('id').split(',')[0].split('(')[1]);
					var c_1 = parseInt(this.getAttribute('id').split(',')[1].split(')')[0]);
					
					if (r_1 != c_1){
						var style = this.getAttribute('style').split(':');
						var color = style[style.length-1];
						this.setAttribute('style', 'stroke: red; stroke-width:5; fill:' + color);
					
						var duplicate = document.getElementById('cell(' + c_1 + ',' + r_1 + ')');
						duplicate.setAttribute('style', 'stroke: red; stroke-width:5; fill:' + color);
					}
					d3.select(this).on('mouseout', function(){
					if (r_1 != c_1){
						var style = this.getAttribute('style').split(':');
						var color = style[style.length-1];
						this.setAttribute('style', 'stroke: black; stroke-width:2; fill:' + color);
					
						var duplicate = document.getElementById('cell(' + c_1 + ',' + r_1 + ')');
						duplicate.setAttribute('style', 'stroke: black; stroke-width:2; fill:' + color);
					}						
					});	
				});
				
				for (var i = 0; i < data.length; i++){
					for (var j = 0; j < data.length; j ++){
						canvas.append('rect').attr('class', 'backgroundCell')
							.attr('width', w_cell).attr('height', h_cell)
							.attr('x', w_cell*(i+1))
							.attr('y', h_cell*(j+1))
							.attr('style', 'opacity: 0.5; stroke: black; stroke-width: 2px; fill: none;');							
					}
				}				
				
				var dx, dy;
				var mousedrag;
				
				/*d3.selectAll('.columnLabel')
					.on('mousedown', function(){
						
						var id = parseInt(this.getAttribute('id').split('columnLabel')[1]);
						userlog.push(['mouseClick',this.getAttribute('id'),timeCount/100]);
						var clickdata = arrayToStr(userlog);
						
						document.getElementById('clickdata').value = clickdata;						
						
						document.getElementById('logMsg').innerHTML = "You have selected a column. Try to select matrix elements.";

					});
				d3.selectAll('.columnLabelText')
					.on('mousedown', function(){
							
						var id = parseInt(this.getAttribute('id').split('columnLabelText')[1]);
						userlog.push(['mouseClick',this.getAttribute('id'),timeCount/100]);
						var clickdata = arrayToStr(userlog);
						
						document.getElementById('clickdata').value = clickdata;						
						document.getElementById('logMsg').innerHTML = "You have selected a column. Try to select matrix elements.";

											
					});
				d3.selectAll('.rowLabel')
					.on('mousedown', function(){
							
						var id = parseInt(this.getAttribute('id').split('rowLabel')[1]);
						userlog.push(['mouseClick',this.getAttribute('id'),timeCount/100]);
						var clickdata = arrayToStr(userlog);
						
						document.getElementById('clickdata').value = clickdata;						
						document.getElementById('logMsg').innerHTML = "You have selected a row. Try to select matrix elements.";

											
					});
				d3.selectAll('.rowLabelText')
					.on('mousedown', function(){
							
						var id = parseInt(this.getAttribute('id').split('rowLabelText')[1]);
						userlog.push(['mouseClick',this.getAttribute('id'),timeCount/100]);
						var clickdata = arrayToStr(userlog);
						
						document.getElementById('clickdata').value = clickdata;						
						document.getElementById('logMsg').innerHTML = "You have selected a row. Try to select matrix elements.";
					
					});
				*/
				
				
			
				
				
																		
			});
			function swapRow(id, y){
				var row = parseInt(id.split('gr')[1]);
				
				var newRow;
				
				for (var i = 0; i < celldata.length; i++){
					if (y <= (i+1)*h_cell && y > (i+0.5)*h_cell){
						newRow = i;
					} else if (y <= (i+1)*h_cell && y > (i)*h_cell){
						newRow = i-1;
					}
				}
				if (row == newRow) return row;

				
				rearrangeCell(row, newRow);
				// change position


				var trans1 = document.getElementById('gr'+row).getAttribute('transform');
				var trans2 = document.getElementById('gr'+newRow).getAttribute('transform');

				var x1 = parseFloat(trans1.split(',')[0].split('(')[1]);
				var y1 = parseFloat(trans1.split(',')[1].split(')')[0]);

				var x2 = parseFloat(trans2.split(',')[0].split('(')[1]);
				var y2 = parseFloat(trans2.split(',')[1].split(')')[0]);
				
				var cap = 75 * Math.abs(row-newRow);
				
				var timing = setInterval(frame, 5);
				var count = 1;
				var int_x_1 = (x2-x1)/cap;
				var int_x_2 = -int_x_1;
				var int_y_1 = (y2-y1)/cap;
				var int_y_2 = -int_y_1;
				
				
				return newRow;
				
				function frame(){
					if (count > cap) {
						clearInterval(timing);
						mouseEvt = 1;
						rest();
						//return newRow;
					}
					else {
						// deactivate any re-ordering
						mouseEvt = 0;
						
						var x = x1 + int_x_1*count;
						var y = y1 + int_y_1*count;
						document.getElementById('gr'+row).setAttribute('transform', 'translate(' + x + ',' + y + ')');
						document.getElementById('gc'+row).setAttribute('transform', 'translate(' + y + ',' + x + ')');
						
						var x = x2 + int_x_2*count;
						var y = y2 + int_y_2*count;
						document.getElementById('gr'+newRow).setAttribute('transform', 'translate(' + x + ',' + y + ')');	
						document.getElementById('gc'+newRow).setAttribute('transform', 'translate(' + y + ',' + x + ')');
						count++;
						
					}

				}


				function rest(){
				swapCellc(row, newRow);
				
				var trans1 = document.getElementById('gc'+row).getAttribute('transform');
				var trans2 = document.getElementById('gc'+newRow).getAttribute('transform');
				
				swapCellr(row, newRow);
				
				document.getElementById('gr'+newRow).setAttribute('id', 'gr_'+ row);
				document.getElementById('gr'+row).setAttribute('id', 'gr_'+newRow);
				
				document.getElementById('gc'+newRow).setAttribute('id', 'gc_' + row);	
				document.getElementById('gc'+row).setAttribute('id', 'gc_' + newRow);	
				
				
				document.getElementById('gr_'+ row).setAttribute('id', 'gr'+ row);
				document.getElementById('gr_'+ newRow).setAttribute('id', 'gr'+newRow);
				
				document.getElementById('gc_' + row).setAttribute('id', 'gc' + row);	
				document.getElementById('gc_' + newRow).setAttribute('id', 'gc' + newRow);				
				}					
				//var c;
			}
			
			function findCell(groups, id, ind){
				for (var i = 0; i < groups.length; i++){
					if (groups[i].getAttribute('id') == id + ind){
						groups[i].setAttribute('id', id + '_' + ind);
						return groups[i];
					}
				}
			}
			
			function rearrangeCell(column, newColumn){
				document.getElementById('gr'+newColumn)
					.appendChild(findCell(document.getElementById('gr'+column).childNodes, 'cell', newColumn));

				document.getElementById('gr'+newColumn)
					.appendChild(findCell(document.getElementById('gr'+column).childNodes, 'cell', column));
				
				document.getElementById('gr'+column)
					.appendChild(findCell(document.getElementById('gr'+newColumn).childNodes, 'cell', newColumn));
					
				document.getElementById('gr'+column)
					.appendChild(findCell(document.getElementById('gr'+newColumn).childNodes, 'cell', column));	
				d3.selectAll('#cell_' + newColumn).attr('id', 'cell' + newColumn);
				d3.selectAll('#cell_' + column).attr('id', 'cell' + column);
				


				document.getElementById('gc'+newColumn)
					.appendChild(findCell(document.getElementById('gc'+column).childNodes, 'cell', newColumn));

				document.getElementById('gc'+newColumn)
					.appendChild(findCell(document.getElementById('gc'+column).childNodes, 'cell', column));
				
				document.getElementById('gc'+column)
					.appendChild(findCell(document.getElementById('gc'+newColumn).childNodes, 'cell', newColumn));
					
				document.getElementById('gc'+column)
					.appendChild(findCell(document.getElementById('gc'+newColumn).childNodes, 'cell', column));	
									
				d3.selectAll('#cell_' + newColumn).attr('id', 'cell' + newColumn);
				d3.selectAll('#cell_' + column).attr('id', 'cell' + column);									
			}
			function swapColumn(id, x){
				var column = parseInt(id.split('gc')[1]);
				
				var newColumn;
				for (var i = 0; i < celldata.length; i++){
					if (x <= (i+1)*w_cell && x > (i+0.5)*w_cell){
						newColumn = i;
					} else if (x <= (i+1)*w_cell && x > (i)*w_cell){
						newColumn = i-1;
					}
				}
				if (column == newColumn) return column;

				
				// change position
				var trans1 = document.getElementById('gr'+column).getAttribute('transform');
				var trans2 = document.getElementById('gr'+newColumn).getAttribute('transform');
				var x1 = parseFloat(trans1.split(',')[0].split('(')[1]);
				var y1 = parseFloat(trans1.split(',')[1].split(')')[0]);

				var x2 = parseFloat(trans2.split(',')[0].split('(')[1]);
				var y2 = parseFloat(trans2.split(',')[1].split(')')[0]);			
				
				rearrangeCell(column, newColumn);
				
				//document.getElementById('gr'+column).setAttribute('transform', trans2);
				//document.getElementById('gr'+newColumn).setAttribute('transform', trans1);
				
				var cap = 75*Math.abs(column-newColumn);
				
				var timing = setInterval(frame, 5);
				var count = 1;
				var int_x_1 = (x2-x1)/cap;
				var int_x_2 = -int_x_1;
				var int_y_1 = (y2-y1)/cap;
				var int_y_2 = -int_y_1;
				
				return newColumn;
				
				function frame(){
					if (count > cap) {
						clearInterval(timing);
						mouseEvt = 1;
						rest();
						
					}
					else {
						// deactivate any re-ordering
						mouseEvt = 0;
						
						var x = x1 + int_x_1*count;
						var y = y1 + int_y_1*count;
						document.getElementById('gr'+column).setAttribute('transform', 'translate(' + x + ',' + y + ')');
						document.getElementById('gc'+column).setAttribute('transform', 'translate(' + y + ',' + x + ')');
						
						var x = x2 + int_x_2*count;
						var y = y2 + int_y_2*count;
						document.getElementById('gr'+newColumn).setAttribute('transform', 'translate(' + x + ',' + y + ')');	
						document.getElementById('gc'+newColumn).setAttribute('transform', 'translate(' + y + ',' + x + ')');
						count++;
						
					}

				}
				
				
				function rest(){
				swapCellr(column, newColumn);
				
				
				var trans1 = document.getElementById('gc'+column).getAttribute('transform');
				var trans2 = document.getElementById('gc'+newColumn).getAttribute('transform');

				
					
	
				
				//document.getElementById('gc'+column).setAttribute('transform', trans2);				
				//document.getElementById('gc'+newColumn).setAttribute('transform', trans1);	
				
				
				
				swapCellc(column, newColumn);
				
				// change index
				document.getElementById('gr'+newColumn).setAttribute('id', 'gr_'+ column);
				document.getElementById('gr'+column).setAttribute('id', 'gr_'+newColumn);
				
				document.getElementById('gc'+newColumn).setAttribute('id', 'gc_' + column);	
				document.getElementById('gc'+column).setAttribute('id', 'gc_' + newColumn);	
				
				
				document.getElementById('gr_'+ column).setAttribute('id', 'gr'+ column);
				document.getElementById('gr_'+ newColumn).setAttribute('id', 'gr'+newColumn);
				
				document.getElementById('gc_' + column).setAttribute('id', 'gc' + column);	
				document.getElementById('gc_' + newColumn).setAttribute('id', 'gc' + newColumn);					
				}
				
									
				//var c;
			}			
			
		function swapCellc(ind1, ind2){
			for (var i = 0; i < celldata.length; i++){
				if (i != ind1 && i != ind2){
					var column = d3.select(document.getElementById('gc' + i))
						.selectAll('.cell');
					for (var j = 0; j < celldata.length; j++){
						if (column._groups[0][j].getAttribute('id') == 'cell' + ind1){
							var y1 = column._groups[0][j].getAttribute('y');
							column._groups[0][j].setAttribute('id', 'cell_' + ind1);
						} else if (column._groups[0][j].getAttribute('id') == 'cell' + ind2){
							var y2 = column._groups[0][j].getAttribute('y');
							column._groups[0][j].setAttribute('id', 'cell_' + ind2);
						}
					}
					d3.select('#cell_' + ind1).attr('id', 'cell' + ind2).attr('y', y2);
					d3.select('#cell_' + ind2).attr('id', 'cell' + ind1).attr('y', y1);
			
				}
			}
		}

		function swapCellr(ind1, ind2){
			for (var i = 0; i < celldata.length; i++){
				if (i != ind1 && i != ind2){
					var column = d3.select(document.getElementById('gr' + i))
						.selectAll('.cell');
						
					for (var j = 0; j < celldata.length; j++){
						if (column._groups[0][j].getAttribute('id') == 'cell' + ind1){
							var x1 = column._groups[0][j].getAttribute('x');
							column._groups[0][j].setAttribute('id', 'cell_' + ind1);
						} else if (column._groups[0][j].getAttribute('id') == 'cell' + ind2){
							var x2 = column._groups[0][j].getAttribute('x');
							column._groups[0][j].setAttribute('id', 'cell_' + ind2);
						}
					}
					d3.select('#cell_' + ind1).attr('id', 'cell' + ind2).attr('x', x2);
					d3.select('#cell_' + ind2).attr('id', 'cell' + ind1).attr('x', x1);						
				
				}
			}
		}
		var timeCount = 0;		
		var timer = setInterval(frame, 10);
		function frame(){
			timeCount++;
			document.getElementById('totaltime').value = timeCount/100;
		}
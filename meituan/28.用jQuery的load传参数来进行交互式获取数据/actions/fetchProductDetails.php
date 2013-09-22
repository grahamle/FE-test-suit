<?php
	$items = array(
		'7141832' => array(
			'name' => 'Chippewa 17-inch Engineer Boot',
			'sku' => '7141832',
			'height' => '17 inches',
			'lining' => 'Leather',
			'colors' => 'Black <abbr>Oil-tanned</abbr>, Black Polishable',
			'price' => '$187.00',
			'features' => '<abbr>Oil-tanned</abbr> or polishable <abbr>full-grain</abbr> leather uppers. <abbr>Vibram</abbr> sole. <abbr>Goodyear welt</abbr>. Padded insole. Steel safety toe.'
		),
		'7173656' => array(
			'name' => 'Chippewa 11-inch Engineer Boot',
			'sku' => '7173656',
			'height' => '11 inches',
			'lining' => 'None',
			'colors' => 'Black, Crazy Horse',
			'price' => '$167.00',
			'features' => '<abbr>Oil-tanned</abbr> <abbr>full-grain</abbr> leather uppers. <abbr>Vibram</abbr> sole. <abbr>Goodyear welt</abbr>. Padded insole. Steel safety toe. Texon&reg; insole.'
		),
		'7141922' => array(
			'name' => 'Chippewa Harness Boot',
			'sku' => '7141922',
			'height' => '13 inches',
			'lining' => 'Leather',
			'colors' => 'Black, Crazy Horse',
			'price' => '$187.00',
			'features' => '<abbr>Full-grain</abbr> leather uppers. Leather lining. <abbr>Vibram</abbr> sole. <abbr>Goodyear welt</abbr>.'
		),
		'7177382' => array(
			'name' => 'Caterpillar Tradesman Work Boot',
			'sku' => '7177382',
			'height' => '6 inches',
			'lining' => 'Leather',
			'colors' => 'Honey, Peanut',
			'price' => '$87.00',
			'features' => '<abbr>Full-grain</abbr> <abbr>oil-tanned</abbr> leather. Nylon mesh lining. Ortholite sock liner. EVA midsole. T84V Rubberlon outsole.'
		),
		'7141730' => array(
			'name' => 'Danner Foreman Pro Work Boot',
			'sku' => '7141730',
			'height' => '10 inches',
			'lining' => 'Leather',
			'colors' => 'Honey, Brown',
			'price' => '$287.00',
			'features' => 'Alkali-resistant <abbr>full-grain</abbr> leather. <abbr>Cambrelle</abbr> nylon lining. Fiberglass shank. <abbr>Vibram</abbr> 4014 Cristy sole. <abbr>Stitch-down</abbr> construction.'
		),
		'7141833' => array(
			'name' => 'Chippewa 17-inch Snakeproof Boot',
			'sku' => '7141833',
			'height' => '17 inches',
			'lining' => 'Leather',
			'colors' => 'Russet',
			'price' => '$147.00',
			'features' => '<abbr>Full-grain</abbr> leather foot. 1000 Denier <abbr>Cordura</abbr> Viper cloth shaft. <abbr>Goodyear welt</abbr>. Leather Lining. Body Cushion Insole. <abbr>Vibram</abbr> Robinson Outsole.'
		),
		'7257914' => array(
			'name' => 'Danner Grouse GTX Boot',
			'sku' => '7257914',
			'height' => '8 inches',
			'lining' => '<abbr>Gore-Tex</abbr>',
			'colors' => 'Brown',
			'price' => '$207.00',
			'features' => '<abbr>Full-grain</abbr> leather foot. 1000 Denier <abbr>Cordura</abbr> Viper cloth shaft. <abbr>Gore-Tex</abbr> lining. Stich-down construction.'
		),
		'7269643' => array(
			'name' => 'Caterpillar Logger Boot',
			'sku' => '7269643',
			'height' => '8 inches',
			'lining' => '<abbr>Cambrelle</abbr>',
			'colors' => 'Black',
			'price' => '$157.00',
			'features' => '<abbr>Full-grain</abbr> leather. <abbr>Cambrelle</abbr>&reg; lining. Steel safety toe. Electrical hazard protection. Poliyou&reg; cushion insole. Rubber lug outsole.'
		),
		'7332058' => array(
			'name' => 'Chippewa 9-inch Briar Waterproof Bison Boot',
			'sku' => '7332058',
			'height' => '9 inches',
			'lining' => 'Chip-A-Tex&reg; waterproof',
			'colors' => 'tan/brown/amber',
			'price' => '$138.00',
			'features' => 'Amber shark skin tip leather. Chip-A-Tex&reg; waterproof bootie. <abbr>Vibram</abbr> long haul outsole. Steel shank. Black nickle non-tarnishable hardware. Heavy duty stay-tied laces. Removable cushion orthotic. Non-insulated.'
		),
		'default' => array(
			'name' => '&mdash;-',
			'sku' => '&mdash;-',
			'height' => '&mdash;-',
			'lining' => '&mdash;-',
			'colors' => '&mdash;-',
			'price' => '&mdash;-',
			'features' => '&mdash;-'
		)
	);
	
	$style = isset($_REQUEST['style']) ? $_REQUEST['style'] : 'default';
	$item = $items[$style];
?>

<div>
  <label>Item name:</label> <?php echo $item['name']; ?>
</div>
<div>
  <label>SKU:</label> <?php echo $item['sku']; ?>
</div>
<div>
  <label>Height:</label> <?php echo $item['height']; ?>
</div>
<div>
  <label>Colors:</label> <?php echo $item['colors']; ?>
</div>
<div>
  <label>Lining:</label> <?php echo $item['lining']; ?>
</div>
<div>
  <label>Today's price:</label> <?php echo $item['price']; ?>
</div>
<div>
  <label>Features:</label> <?php echo $item['features']; ?>
</div>
<div align="center">
 	<?php if ($style != 'default') { ?>
    <img id="itemPhoto" src="/photos/<?php echo $item['sku']; ?>.png" />
  <?php } ?>
</div>

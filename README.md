# jQuery-GoGoTabs
Just a quick little jQuery tabs script that I wrote that supports browser history, and url linking.

Simply implement the html in the structured format and the script will take care of everything else for you.

```html
	<div class="gogo-tabs">
		<div class="tabs-navigation">
			<a href="/#tab=tab1" data-tab="tab1">Tab 1</a>
			<a href="/#tab=tab2" data-tab="tab2">Tab 2</a>
			<a href="/#tab=tab3" data-tab="tab3">Tab 3</a>
			<a href="/#tab=all" data-tab="all">All</a>
		</div>
		<div class="tabs-content">
			<div class="content-piece active" id="tab1">testing tab content 1</div>
			<div class="content-piece" id="tab2">testing tab content 2</div>
			<div class="content-piece" id="tab3">testing tab content 3</div>
		</div>
	</div>


```
[Demo](http://codepen.io/anon/pen/qEemro)

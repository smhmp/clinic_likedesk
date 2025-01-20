import Vue from "vue";

import pageHeading from "~/components/pageHeading";

Vue.component("page-heading", pageHeading);

Vue.component('wrap-if', {
  functional: true,
  props: ['wrap', 'wrapper'],
  render(h, ctx) {
    if (ctx.props.wrap) {
      return h(ctx.props.wrapper, ctx.data, ctx.children)
    } else {
      // not worked in Vue 2 warning: Multiple root nodes returned from render function. Render function should return a single root node.
      return ctx.children
    }
  }
})

Vue.directive('fragments', {
  inserted: function(el) {
    const parent = el.parentNode;
    const children = el.children;
    while (children[0]){
      parent.insertBefore(children[0],el);
    }
    parent.removeChild(el)
  }
});


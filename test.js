cssExplain = require('./css-explain').cssExplain;

// References
//
// * https://developers.google.com/speed/docs/best-practices/rendering
// * https://developer.mozilla.org/en/Writing_Efficient_CSS
// * http://www.stuffandnonsense.co.uk/archives/images/specificitywars-05v2.jpg

exports.score = {
  "descendant selectors with universal selector key": function(test) {
    test.equal(cssExplain("body *").score, 10);
    test.equal(cssExplain(".hide-scrollbars *").score, 10);

    test.done();
  },

  "descendant selectors with tag selector key": function(test) {
    test.equal(cssExplain("ul li a").score, 8);
    test.equal(cssExplain("#footer h3").score, 8);
    test.equal(cssExplain("* html #atticPromo ul li a").score, 8);

    test.done();
  },

  "descendant selectors with class selector key": function(test) {
    test.equal(cssExplain("li .item").score, 6);
    test.equal(cssExplain("#footer .copyright").score, 6);

    test.done();
  },

  "child selectors with universal selector key": function(test) {
    test.equal(cssExplain("body > *").score, 9);
    test.equal(cssExplain(".hide-scrollbars > *").score, 9);

    test.done();
  },

  "child selectors with tag selector key": function(test) {
    test.equal(cssExplain("ul > li > a").score, 7);
    test.equal(cssExplain("#footer > h3").score, 7);

    test.done();
  },

  "over qualified selectors": function(test) {
    test.equal(cssExplain("ul#top_blue_nav").score, 3);
    test.equal(cssExplain("form#UserLogin").score, 3);
    test.equal(cssExplain("button#backButton").score, 3);
    test.equal(cssExplain(".menu-left#newMenuIcon").score, 3);

    test.done();
  },

  "simple": function(test) {
    test.equal(cssExplain("#footer").score, 1);
    test.equal(cssExplain(".item").score, 2);
    test.equal(cssExplain("li").score, 3);

    test.done();
  }
};

exports.category = {
  "id category selectors": function(test) {
    test.equal(cssExplain("button#backButton").category, 'id');
    test.equal(cssExplain("#urlBar[type=\"autocomplete\"]").category, 'id');
    test.equal(cssExplain("treeitem > treerow > treecell#myCell:active").category, 'id');

    test.done();
  },

  "class category selectors": function(test) {
    test.equal(cssExplain("button.toolbarButton").category, 'class');
    test.equal(cssExplain(".fancyText").category, 'class');
    test.equal(cssExplain("menuitem > .menu-left[checked=\"true\"]").category, 'class');

    test.done();
  },

  "tag category selectors": function(test) {
    test.equal(cssExplain("td").category, 'tag');
    test.equal(cssExplain("treeitem > treerow").category, 'tag');
    test.equal(cssExplain("input[type=\"checkbox\"]").category, 'tag');

    test.done();
  },

  "universal category selectors": function(test) {
    test.equal(cssExplain("[hidden=\"true\"]").category, 'universal');
    test.equal(cssExplain("*").category, 'universal');
    test.equal(cssExplain("tree > [collapsed=\"true\"]").category, 'universal');

    test.done();
  }
};

exports.specificity = function(test) {
  test.deepEqual(cssExplain("*").specificity, [0, 0, 0]);
  test.deepEqual(cssExplain("li").specificity, [0, 0, 1]);
  test.deepEqual(cssExplain("li:first-line").specificity, [0, 0, 2]);
  test.deepEqual(cssExplain("ul li").specificity, [0, 0, 2]);
  test.deepEqual(cssExplain("ul ol+li").specificity, [0, 0, 3]);
  test.deepEqual(cssExplain("h1 + *[rel=up]").specificity, [0, 1, 1]);
  test.deepEqual(cssExplain("ul ol li.red").specificity, [0, 1, 3]);
  test.deepEqual(cssExplain("li.red.level").specificity, [0, 2, 1]);
  test.deepEqual(cssExplain("#x34y").specificity, [1, 0, 0]);

  test.deepEqual(cssExplain("a").specificity, [0, 0, 1]);
  test.deepEqual(cssExplain("p a").specificity, [0, 0, 2]);
  test.deepEqual(cssExplain(".whatever").specificity, [0, 1, 0]);
  test.deepEqual(cssExplain("a.whatever").specificity, [0, 1, 1]);
  test.deepEqual(cssExplain("p a.whatever").specificity, [0, 1, 2]);
  test.deepEqual(cssExplain(".whatever .whatever").specificity, [0, 2, 0]);
  test.deepEqual(cssExplain("p.whatever a.whatever").specificity, [0, 2, 2]);
  test.deepEqual(cssExplain("#whatever").specificity, [1, 0, 0]);
  test.deepEqual(cssExplain("a#whatever").specificity, [1, 0, 1]);
  test.deepEqual(cssExplain(".whatever a#whatever").specificity, [1, 1, 1]);
  test.deepEqual(cssExplain(".whatever .whatever #whatever").specificity, [1, 2, 0]);
  test.deepEqual(cssExplain("#whatever #whatever").specificity, [2, 0, 0]);

  test.done();
};
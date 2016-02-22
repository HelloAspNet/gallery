/**
 * Created by yidong.wen on 2016/2/22.
 */
(function () {

  /**
   * 自动渲染template方法
   * @param dataTree  所有数据组成的对象
   */
  var renderAll = (function (template) {
    return function (dataTree) {
      var name, el;
      for (name in dataTree) {
        if (
          Object.prototype.hasOwnProperty.call(dataTree, name)
          && (el = document.getElementById(name + '_html'))
        ) {
          var data = dataTree[name];
          var callback = (function (el, name) {
            return function (d) {
              el.innerHTML = template(name + '_tpl', d);
            }
          })(el, name);
          typeof data !== 'function' ? callback(data) : data(callback);
        }
      }
    };
  })($.Tpl);

  renderAll({
    kmod_nav: {
      list: new Array(3)
    },
    kmod1: {
      list: new Array(7)
    },
    kmod2: {
      list: new Array(3)
    },
    kmod3: {
      list: new Array(5)
    }
  });


  var $nav = $('.kmod-nav');
  var offset = $nav.offset();

  var $win = $(window);
  var $doc = $(document);

  var $navHash = $('.kmod-hash');

  var $navHashNew = $navHash.map(function () {
    var $this = $(this);
    return {
      top: $this.offset().top,
      $el: $this,
      $ctrl: $('[data-id=' + $this.attr('id') + ']')
    };
  });

  $navHashNew.sort(function (a, b) {
    return a.top - b.top;
  });


  $win.on({
    // 悬浮导航
    'scroll.kmodNav': function () {
      var scrollTop = $doc.scrollTop();
      $nav[scrollTop > offset.top ? 'addClass' : 'removeClass']('kmod-fixed');
    },
    // 选中当前导航
    'scroll.kmodNavFocus': function () {
      var scrollTop = $doc.scrollTop();
      var len = $navHashNew.length;
      var index = 0;
      do {
        len -= 1;
        index = len;
      }
      while (index >= 0 && scrollTop < $navHashNew[index].top);

      $navHashNew.each(function (i, v) {
        v.$ctrl && v.$ctrl.removeClass('kmod-hover');
      });

      index >= 0 && $navHashNew[index].$ctrl.addClass('kmod-hover');
    }
  });


  $doc.delegate('.kmod-nav a', {
    'click.kmodNav': function () {

      $('html, body').scrollTop(200);
    }
  });


})();

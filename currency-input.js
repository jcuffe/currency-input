$(document).ready(function() {
  function handleClick() {
    last = $(this).val().length;
    $(this)
      .get(0)
      .setSelectionRange(last, last);
  }

  function handleInput(event) {
    event = event.originalEvent;
    var queue = $(this).data("queue");
    if (event.inputType.startsWith("deleteContent")) {
      queue.pop();
      if (queue.length < 3) {
        queue.unshift(0);
      }
    }
    var n = parseInt(event.data);
    if (n == event.data) {
      queue.push(n);
      if (queue.length > 3 && queue[0] == 0) {
        queue.shift();
      }
    }
    $(this).val(formatQueue(queue));
  }

  function formatQueue(queue) {
    var output = [];
    var count = 0;
    for (var i = queue.length - 1; i >= 0; i--) {
      count++;
      if (count == 3) {
        output.unshift(".");
      }
      if (count >= 5 && (count - 3) % 3 == 0) {
        output.unshift(",");
      }
      output.unshift(queue[i]);
    }
    output.unshift("$");
    return output.join("");
  }

  $("input[type=currency]").each(function() {
    $(this).val("$0.00");
    $(this).data("queue", [0, 0, 0]);
    $(this).on("click", handleClick);
    $(this).on("input", handleInput);
  });
});

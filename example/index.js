import { Flip } from "../number-flip";
import "./main.css";

const $ = (s) => document.querySelector(s);

const flip = new Flip({
  node: $(".flip"),
  direct: false,
  duration: 10,
  from: 7258829,
  easeFn: function (pos) {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
    return 0.5 * (Math.pow(pos - 2, 3) + 2);
  },
  systemArr: ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"],
  digitClassName: "DDD",
});

$(".shuffle").onclick = () => {
  const num = ~~(Math.random() * 9999999);
  $(".num").innerText = num;
  flip.flipTo({ to: num, direct: false });
};

$(".destroy").onclick = () => {
  flip.destroy();
};

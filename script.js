let leftWeight = 0, rightWeight = 0;
let selectedValue = null;
let selectedElement = null;

// 数字をタップで選択
function selectNumber(event) {
    if (selectedElement) {
        selectedElement.classList.remove("selected");
    }
    selectedElement = event.target;
    selectedValue = parseInt(event.target.getAttribute("data-value"));
    selectedElement.classList.add("selected");
}

// プレートをタップして数字を追加
function placeNumber(side) {
    if (!selectedValue) return;

    let contentArea = document.getElementById(`${side}-content`);
    let numberElement = document.createElement('div');
    numberElement.className = 'number-on-plate';
    numberElement.textContent = selectedValue;
    contentArea.appendChild(numberElement);

    // 重さを加算
    if (side === 'left') {
        leftWeight += selectedValue;
    } else {
        rightWeight += selectedValue;
    }
    updatePlates();

    // 選択解除
    selectedElement.classList.remove("selected");
    selectedElement = null;
    selectedValue = null;
}

// プレートの動きを更新（重い方が下に下がる）
function updatePlates() {
    let leftPlate = document.getElementById("left-plate");
    let rightPlate = document.getElementById("right-plate");

    let maxShift = 50; // 最大移動距離

    // 重い方を下に
    leftPlate.style.top = `${50 + Math.max(0, (leftWeight - rightWeight) / 2 * maxShift / 10)}px`;
    rightPlate.style.top = `${50 + Math.max(0, (rightWeight - leftWeight) / 2 * maxShift / 10)}px`;

    // 結果表示の更新
    document.getElementById("result-display").textContent = 
        `左 ${leftWeight} ${leftWeight < rightWeight ? '<' : leftWeight > rightWeight ? '>' : '='} 右 ${rightWeight}`;
}

// プレートと数字のリセット
function resetBalance() {
    leftWeight = 0;
    rightWeight = 0;

    document.getElementById("left-plate").style.top = "50px";
    document.getElementById("right-plate").style.top = "50px";

    document.getElementById("left-content").innerHTML = '';
    document.getElementById("right-content").innerHTML = '';

    if (selectedElement) {
        selectedElement.classList.remove("selected");
    }
    selectedElement = null;
    selectedValue = null;
    updatePlates();
}

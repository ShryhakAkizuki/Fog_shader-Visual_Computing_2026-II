let fogNearSlider, fogFarSlider;
let fogNearLabel, fogFarLabel;

function initFogUI() {
  const panel = document.createElement('div');
  panel.id = 'fog-panel';
  panel.innerHTML =
    '<div class="fog-panel-title">NIEBLA</div>' +
    '<label>fogNear' +
      '<input type="range" id="fog-near" min="' + FOG_MIN + '" max="' + FOG_MAX +
      '" step="' + FOG_STEP + '" value="' + settings.fogNear + '">' +
      '<span class="fog-val" id="fog-near-val">' + Math.round(settings.fogNear) + '</span>' +
    '</label>' +
    '<label>fogFar' +
      '<input type="range" id="fog-far" min="' + FOG_MIN + '" max="' + FOG_MAX +
      '" step="' + FOG_STEP + '" value="' + settings.fogFar + '">' +
      '<span class="fog-val" id="fog-far-val">' + Math.round(settings.fogFar) + '</span>' +
    '</label>';
  document.body.appendChild(panel);

  fogNearSlider = document.getElementById('fog-near');
  fogFarSlider = document.getElementById('fog-far');
  fogNearLabel = document.getElementById('fog-near-val');
  fogFarLabel = document.getElementById('fog-far-val');

  fogNearSlider.addEventListener('input', function () {
    const v = Number(fogNearSlider.value);
    settings.fogNear = v;
    fogNearLabel.textContent = Math.round(v);
  });

  fogFarSlider.addEventListener('input', function () {
    const v = Number(fogFarSlider.value);
    settings.fogFar = v;
    fogFarLabel.textContent = Math.round(v);
  });
}

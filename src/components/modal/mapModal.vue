<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  mapx: String,
  mapy: String,
  telNumber: String,
  address: String,
  onClose: Function,
});

// 오버레이 닫기 함수
const closeOverlay = (overlay) => {
  overlay.setMap(null);
};

const initMap = () => {
  const container = document.getElementById("map");
  if (!container) return;

  console.log("지도 초기화 시작", props.mapx, props.mapy);

  try {
    kakao.maps.load(() => {
      const options = {
        center: new kakao.maps.LatLng(
          parseFloat(props.mapy),
          parseFloat(props.mapx)
        ),
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          parseFloat(props.mapy),
          parseFloat(props.mapx)
        ),
        map: map,
      });

      // 커스텀 오버레이 내용
      const content = `
        <div class="wrap">
          <div class="info">
            <div class="title">
              축제 정보
              <div class="close" onclick="document.dispatchEvent(new CustomEvent('closeOverlay'))" title="닫기"></div>
            </div>
            <div class="map-body">

              <div class="desc">
                <div class="ellipsis">주소: ${
                  props.address || "주소 정보 없음"
                }</div>
          <div class="jibun ellipsis">연락처: ${
            props.telNumber || "연락처 정보 없음"
          }</div>
              </div>
            </div>
          </div>
        </div>`;

      // 커스텀 오버레이 생성
      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: marker.getPosition(),
        map: map,
      });

      // 마커 클릭 이벤트
      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });

      // 오버레이 닫기 이벤트 리스너
      document.addEventListener("closeOverlay", () => closeOverlay(overlay));

      console.log("지도 생성 완료");
    });
  } catch (error) {
    console.error("지도 초기화 중 오류 발생:", error);
  }
};

onMounted(() => {
  console.log("모달 마운트됨");
  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_MAP_API_KEY
  }&autoload=false`;
  script.onload = () => {
    kakao.maps.load(() => {
      initMap();
    });
  };
  document.head.appendChild(script);
});
</script>

<template>
  <div class="modal-overlay">
    <div class="map-modal">
      <button class="close-button" @click="onClose">×</button>
      <div id="map" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.map-modal {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  width: 80%;
  max-width: 600px;
  height: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid #ff6f61;
  background-color: rgba(255, 255, 255, 0.5);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 28px;
  color: #333;
  cursor: pointer;
  z-index: 1001;
}

#map {
  width: 100%;
  height: 100%;
  min-height: 360px; /* 최소 높이 지정 */
}

/* 커스텀 오버레이 스타일 */
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
  background-color: transparent;
}

.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 8px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}

.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}

.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 12px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
  background-size: contain; /* 컨테이너에 맞게 이미지 크기 조절 */
  background-position: center; /* 이미지 중앙 정렬 */
  background-repeat: no-repeat; /* 이미지 반복 없음 */
}

.info .close:hover {
  cursor: pointer;
}

.info .body {
  position: relative;
  overflow: hidden;
}

.info .desc {
  position: relative;
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
  gap: 8px;
}

.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
}

.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}

.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}

.info:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

.info .link {
  color: #5085bb;
}
</style>

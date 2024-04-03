from fastapi import FastAPI, File
from segmentation import get_image_from_bytes, get_yolov5_basic, get_yolov5_johnnie, get_yolov5_jack, get_yolov5_ballentines, get_yolov5_empty
from starlette.responses import Response
import io
from PIL import Image
import json
from fastapi.middleware.cors import CORSMiddleware


basicModel = get_yolov5_basic()
johnnieModel = get_yolov5_johnnie()
jackModel = get_yolov5_jack()
ballentinesModel = get_yolov5_ballentines()
emptyModel = get_yolov5_empty()

app = FastAPI(
    title="Custom YOLOV5 Machine Learning API",
    description="""Obtain object value out of image
                    and return image and json result""",
    version="0.0.1",
)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/notify/v1/whiskey')
def get_health():
    """
    Usage on K8S
    readinessProbe:
        httpGet:
            path: /notify/v1/health
            port: 80
    livenessProbe:
        httpGet:
            path: /notify/v1/health
            port: 80
    :return:
        dict(msg='OK')
    """
    return dict(msg='OK')


@app.post("/object-to-json/basic")
async def detect_whiskey_return_json_result(file: bytes = File(...)):
    input_image = get_image_from_bytes(file)
    results = basicModel(input_image)
    all_c = all_count(results, input_image)
    result_json = results_to_json(results, basicModel, all_c)
    # detect_res = results.pandas().xyxy[0].to_json(orient="records")  # JSON img1 predictions
    # detect_res = json.loads(detect_res)
    return {"result": result_json}

@app.post("/object-to-json/johnnie")
async def detect_whiskey_return_json_result(file: bytes = File(...)):
    input_image = get_image_from_bytes(file)
    results = johnnieModel(input_image)
    all_c = all_count(results, input_image)
    result_json = results_to_json(results, johnnieModel, all_c)
    # detect_res = results.pandas().xyxy[0].to_json(orient="records")  # JSON img1 predictions
    # detect_res = json.loads(detect_res)
    return {"result": result_json}

@app.post("/object-to-json/jack")
async def detect_whiskey_return_json_result(file: bytes = File(...)):
    input_image = get_image_from_bytes(file)
    results = jackModel(input_image)
    all_c = all_count(results, input_image)
    result_json = results_to_json(results, jackModel, all_c)
    # detect_res = results.pandas().xyxy[0].to_json(orient="records")  # JSON img1 predictions
    # detect_res = json.loads(detect_res)
    return {"result": result_json}

@app.post("/object-to-json/ballentines")
async def detect_whiskey_return_json_result(file: bytes = File(...)):
    input_image = get_image_from_bytes(file)
    results = ballentinesModel(input_image)
    all_c = all_count(results, input_image)
    result_json = results_to_json(results, ballentinesModel, all_c)
    # detect_res = results.pandas().xyxy[0].to_json(orient="records")  # JSON img1 predictions
    # detect_res = json.loads(detect_res)
    return {"result": result_json}

@app.post("/object-to-json/empty")
async def detect_whiskey_return_json_result(file: bytes = File(...)):
    input_image = get_image_from_bytes(file)
    results = emptyModel(input_image)
    all_c = all_count(results, input_image)
    result_json = results_to_json(results, emptyModel, all_c)
    # detect_res = results.pandas().xyxy[0].to_json(orient="records")  # JSON img1 predictions
    # detect_res = json.loads(detect_res)
    return {"result": result_json}

def results_to_json(results, model, all_c):

    answer = list()
    whiskeys = set()
    # utils = {}
    othersCount = 0
    # whiskeyCount = 0
    # all count & detect count



    for result in results.xyxy:
        for pred in result:
            class_name = model.model.names[int(pred[5])]
            whiskeys.add(class_name)
            # if class_name == 'others':
            #     othersCount += 1
            #     continue
            #
            # if class_name in whiskeys:
            #     whiskeys[class_name] += 1
            # else:
            #     whiskeys[class_name] = 1
            whiskeyCount += 1

    othersCount = all_c - len(whiskeys)
    # utils["others"] = othersCount
    # utils["all"] = whiskeyCount + othersCount
    answer.append(whiskeys)
    answer.append(othersCount)
    # answer.append(utils)
    return {"whiskeys": whiskeys, "others": othersCount}

def all_count(input_image):
    results = emptyModel(input_image)
    count = 0
    # whiskeyCount = 0
    for result in results.xyxy:
        for pred in result:
            count += 1
            # class_name = model.model.names[int(pred[5])]
            # if class_name == 'others':
            #     count += 1
            #     continue
            #
            # if class_name in whiskeys:
            #     whiskeys[class_name] += 1
            # else:
            #     whiskeys[class_name] = 1
            # whiskeyCount += 1

    # utils["others"] = othersCount
    # utils["all"] = whiskeyCount + othersCount
    # answer.append(whiskeys)
    # answer.append(utils)
    return count

@app.post("/object-to-img/basic")
async def detect_food_return_base64_img(file: bytes = File(...)):
    input_image = get_image_from_bytes(file)
    results = basicModel(input_image)
    r_img = results.render()  # updates results.imgs with boxes and labels

    bytes_io = io.BytesIO()
    img_base64 = Image.fromarray(r_img[0])
    img_base64.save(bytes_io, format="jpeg")
    return Response(content=bytes_io.getvalue(), media_type="image/jpeg")

@app.post("/object-to-img/johnnie")
async def detect_food_return_base64_img(file: bytes = File(...)):
    input_image = get_image_from_bytes(file)
    results = johnnieModel(input_image)
    r_img = results.render()  # updates results.imgs with boxes and labels

    bytes_io = io.BytesIO()
    img_base64 = Image.fromarray(r_img[0])
    img_base64.save(bytes_io, format="jpeg")
    return Response(content=bytes_io.getvalue(), media_type="image/jpeg")

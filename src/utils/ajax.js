export function ajaxRequest(method, url, success) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();
    request.onload = () => {
        try {
            return success(JSON.parse(request.response));
        } catch (error) {
            console.log(error);
        }
    }
}
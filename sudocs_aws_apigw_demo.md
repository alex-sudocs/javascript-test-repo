## POST /notes
__Create a new note__<br />Action: create<br />Parameters:
```
  title: string
  description: string
  reminder: boolean
  status: string
  category: string
```
Response:
```
  success: 200
  error: 400
```


## GET /notes/{id}
__Get one note__<br />Action: getOne<br />Parameters:
```
  id: string
```
Response:
```
  success: 200
  error: 404
```


## GET /notes
__Get all notes__<br />Action: getAll<br />Parameters:
```
  none
```
Response:
```
  success: 200
  error: 404
```


## PUT /notes/{id}
__Update a note__<br />Action: update<br />Parameters:
```
  title: string
  description: string
  reminder: boolean
  status: string
  category: string
```
Response:
```
  success: 204
  error: 400
```


## DELETE /notes/{id}
__Delete a note__<br />Action: delete<br />Parameters:
```
  id: string
```
Response:
```
  success: 200
  error: 400
```



# Back-end for Weight-Lifting-Journal-1

## Models
### Users
{
    username: string - REQUIRED
    password: string - REQUIRED
}

### User Exercises
{
    date: string - REQUIRED
    name: string - REQUIRED
    body_region: string - REQUIRED
    weight: integer - REQUIRED
    reps: integer - REQUIRED
    sets: integer - REQUIRED
    journal: string - REQUIRED
}

## Endpoints
BASE URL: https://bw-weight-lifting-journal-01.herokuapp.com/

### Users
| Request| Endpoint           | Description                                         |
| ------ | -------------------| --------------------------------------------------- |
|  POST  | /api/auth/register | Register new user. Username, password required      |
|  POST  | /api/auth/login    | Login. Username, password required.                 |

### User Exercises
| Request| Endpoint                 | Description                                   |
| ------ | ------------------------ | --------------------------------------------- |
|  GET   | /api/users/:id/exercises | Get all user exercises by User ID             |
|  POST  | /api/users/:id/exercises | Add User Exercise to specific user            |

### Exercises
| Request| Endpoint           | Description                                         |
| ------ | -------------------| --------------------------------------------------- |
|  GET   | /api/exercises/:id | Get exercise by exercise ID                         |
|  PUT   | /api/exercises/:id | Update exercise by exercise ID                      |
| DELETE | /api/exercises/:id | Delete exercise by exercise ID                      |
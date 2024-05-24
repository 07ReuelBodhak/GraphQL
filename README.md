# **GraphQL with Node js**

- **typeDefs** : definitions of different type of data we want to expose on our graph

- **id: ID!** : this means id is required if you want to insert new details

- **Query** : Entry point to understand graphql what users are requesting

- **resolver** : resolver function are used to handle any incoming data for client

## **Fetch all data in graphQL**

- **Fetching all data** :

  ```query AllQuery {
      reviews {
        rating,
        content
      }
    }

  ```

- **Fetch single data from db**:

  - **review(id: ID!): Review** : this code specifies that the when user make request to review function he should provide and id to it and based on that id he will get data

  - **review(\_, args){}**: in the args function will return the argument pass to the review function
    `_return db.reviews.find((review)=> review.id === args.id)_` basically this function finds the review based on id passed to review function

  - **Example**:

  ```
    query ReviewQuery($id: ID!){
      review(id: $id){
        rating,
        content
      }
    }

    variables :
      {
        "id" : "1"
      }
  ```

  basically in this code we are setting the variable '_id_' to '_1_'. The '_($id: ID!)_' specifies that '_ReviewQuery_' requires one variable called '_id_' with type of '_ID_'. The '_review(id: $id)_' specifies the query to fetch a review with the given id

- **Related Data**:

  In Game and Author function we have added a field '_reviews : [Review]_', and in Review function we have added to field '_game : Game!_' and '_author: Author!_' this field represents the _game_ and _author_ review and _!_ indicates that it should'nt be empty

  - **'Game' Resolver'**:

  ```
    Game: {
      reviews(parent) {
        return db.reviews.filter((r) => r.game_id === parent.id);
      },
    }
  ```

  this function is responsible for fetching reviews related to game

  - _'parent'_ : this parameter represents parent object, which in this case is '_Game_'.
  - _`db.review.filter((r)=> r.game_id === parent.id)`_ : This line filters the '_reviews_' in the '_db.reviews_' collection, returning only those reviews where the '_game_id_' matches the '_id_' of the Game object (i.e., parent.id).

  - **'Author' Resolver**:

  ```
    Author: {
      reviews(parent) {
        return db.reviews.filter((r) => r.author_id === parent.id);
      },
    },
  ```

  this resolver is same as Game resolver but instead of games the reviews are fetched based on authors

  - **'Review' Resolver** :

    - _Review.author_: This resolver function is responsible for fetching the author of a specific review.

    - _Review.game_: This resolver function is responsible for fetching the game related to a specific review.

  - **Example** :

  ```
    query ReviewQuery($id: ID!){
      review(id : $id){
        rating,
        game {
          title
          platform
            reviews {
              rating
              content
            }
          }
        }
      }
  ```

- **Mutation (Add or Delete) Data** :

  - **'Delete Data'** :

    In schema.js add this field `_deleteGame(id : ID!): [Game]_` so what does it mean the '_deleteGame_' function will delete Game based on id and return array of new Games with the id of game being deleted

    ```
    Mutation: {
      deleteGame(_, args) {
        db.games = db.games.filter((g) => g.id !== args.id);
        return db.games;
      },
    },
    ```

    This code defines a mutation resolver deleteGame for a GraphQL server. When called, it deletes a game from the db.games collection by filtering out the game whose id matches the id provided in args. The mutation then returns the updated list of games.

    - **Example**:

      ```
      mutation  DeleteGame($id : ID!){
        deleteGame(id : $id){
          id,
          title,
          platform
        }
      }

      {
        "id": "5111"
      }
      ```

  - **'Add Data'** :

    in this schema we have added new filed called `addGame(game: AddGameInput!) : Game`.This code defines a GraphQL mutation called '_addGame_' which takes a single argument, _'game'_, of type '_AddGameInput_'. The mutation returns an object of type '_Game_'. This setup is used to add a new game to the system, with the details of the game provided through the '_AddGameInput_' input type.

    ```
    input AddGameInput {
      title: String!,
      platform: [String!]!
    }
    ```

    This code defines an input type in GraphQL named AddGameInput. It specifies the structure of the data required to add a new game.

    ```
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() \* 10000),
      };
      db.games.push(game);
      return game;
      },
    ```

    in this '_addGame_' resolver we have defined the object called game and in that object we are spread the '_..args.game_' means the '_game_' value from here `addGame(game: AddGameInput!) : Game` the we are creating a random id using Math.random function and then we are pushing that result in db.games and return the game that we have created

    - **Example**:

    ```
    mutation AddGame($game: AddGameInput!){
      addGame(game: $game) {
        id
        title
        platform
      }
    }

    {
    "game": {
      "title": "mario Bros",
      "platform": ["nintendo","pc"]
      }
    }
    ```

  - **'Update Data'** :

    This code defines a GraphQL mutation named '_updateGame_' which takes two arguments: '_id_' of type '_ID!_', representing the unique identifier of the game to be updated, and '_edits_' of type '_EditGameInput!_', representing the changes to be made to the game's details. The mutation returns an object of type '_Game_'. This setup is used to update an existing game in the system with the specified edits provided in the EditGameInput input type.

    ```
    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }
        return g;
      });
      return db.games.find((g) => g.id === args.id);
    },
    ```

    This code defines a resolver function for the '_updateGame_' mutation in a GraphQL server. It updates a game in the '_db.games_' collection by mapping through the games and finding the one with the matching '_id_'. If a game's '_id_' matches '_args.id_', it merges the existing game data ('_g_') with the new edits ('_args.edits_'). The updated game is then returned. If the '_id_' does not match, the game remains unchanged. After updating the game, it returns the updated game object.

    - **Example** :

    ```
    mutation UpdateGame($edits: EditGameInput!,$id: ID!){
      updateGame(edits: $edits, id: $id){
      title,
      platform
     }
    }

    {
      "edits": {
        "title": "Zelda: Tears of the Kingdom 2"
        },
      "id": "1",
    }
    ```

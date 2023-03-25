package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	sandbox "app/utils/sandbox"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type User struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Age  int    `json:"age"`
}

var users = []User{
	{ID: "1", Name: "John Doe", Age: 30},
	{ID: "2", Name: "Jane Smith", Age: 25},
}

var userType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "User",
		Fields: graphql.Fields{
			"id":   &graphql.Field{Type: graphql.String},
			"name": &graphql.Field{Type: graphql.String},
			"age":  &graphql.Field{Type: graphql.Int},
		},
	},
)

var queryType = graphql.NewObject(
	graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"users": &graphql.Field{
				Type: graphql.NewList(userType),
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					pg := params.Context.Value("pg").(*sql.DB)
					rows, _ := pg.Query("select * from product")
					var id string
					var title string
					var price int
					for rows.Next() {
						err := rows.Scan(&id, &title, &price)
						if err != nil {
							panic(err)
						}
						fmt.Println(id, title, price)
					}
					fmt.Println()
					return users, nil
				},
			},
			"user": &graphql.Field{
				Type: userType,
				Resolve: func(params graphql.ResolveParams) (interface{}, error) {
					fmt.Println(params.Context.Value("pg"))
					return users[0], nil
				},
			},
		},
	},
)

var schema, _ = graphql.NewSchema(
	graphql.SchemaConfig{
		Query: queryType,
	},
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	const (
		host     = "localhost"
		port     = 8000
		user     = "postgres"
		password = "postgres_password"
		dbname   = "postgres"
	)
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Ping the database to verify connectivity.
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	PORT := os.Getenv("API_PORT")
	API_URL := os.Getenv("API_URL")

	handler := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   false,
		GraphiQL: false,
	})

	sandboxHTML := sandbox.Url(API_URL)

	byteSandboUrl := []byte(sandboxHTML)

	http.HandleFunc("/graphql", func(w http.ResponseWriter, r *http.Request) {
		// qwe := r.Header.Clone()
		// for k, v := range qwe {
		// 	fmt.Println(k, v[0])
		// }
		// fmt.Println(qwe)
		ctx := context.WithValue(context.Background(), "pg", db)
		handler.ContextHandler(ctx, w, r)
	})

	http.Handle("/sandbox", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write(byteSandboUrl)
	}))

	fmt.Println("Server is running on port " + PORT + "...")
	http.ListenAndServe(":"+PORT, nil)
}

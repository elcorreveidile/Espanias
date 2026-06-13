CREATE TABLE "components" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"descripcion" text,
	"categoria" varchar(100),
	"projects_using" varchar(500),
	"doc_url" text,
	"esquema_bd" text,
	"componentes_react" varchar(500),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "components_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "learnings" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer,
	"titulo" varchar(255),
	"contenido" text,
	"tipo" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "magic_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "magic_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(100) NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"claim" varchar(500),
	"sector" varchar(100),
	"descripcion" text,
	"estado" varchar(50),
	"paleta_principal" varchar(7),
	"paleta_secundaria" varchar(7),
	"paleta_accion" varchar(7),
	"tipografia_titulos" varchar(100),
	"tipografia_cuerpo" varchar(100),
	"backend" varchar(50),
	"orm" varchar(50),
	"auth_provider" varchar(50),
	"plan_maestro_url" text,
	"repositorio_url" text,
	"demo_url" text,
	"notas_internas" text,
	"componentes_incluidos" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "shared_decisions" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"descripcion" text,
	"categoria" varchar(100),
	"decision" text,
	"razon" text,
	"referencia_proyectos" varchar(500),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"nombre" varchar(255),
	"rol" varchar(50) DEFAULT 'viewer',
	"creado_por" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "learnings" ADD CONSTRAINT "learnings_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_creado_por_users_id_fk" FOREIGN KEY ("creado_por") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
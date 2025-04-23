export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      fight_types: {
        Row: {
          id: number
          type: string | null
        }
        Insert: {
          id?: number
          type?: string | null
        }
        Update: {
          id?: number
          type?: string | null
        }
        Relationships: []
      }
      fighting_styles: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      interaction_status: {
        Row: {
          id: number
          status: string
        }
        Insert: {
          id?: number
          status: string
        }
        Update: {
          id?: number
          status?: string
        }
        Relationships: []
      }
      interactions: {
        Row: {
          actor_id: string
          created_at: string
          id: string
          photo_id: string | null
          status_id: number
          target_id: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          actor_id: string
          created_at?: string
          id?: string
          photo_id?: string | null
          status_id: number
          target_id: string
          updated_at?: string
          updated_by: string
        }
        Update: {
          actor_id?: string
          created_at?: string
          id?: string
          photo_id?: string | null
          status_id?: number
          target_id?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_photo_id_fkey"
            columns: ["photo_id"]
            isOneToOne: false
            referencedRelation: "profile_photos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "interaction_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_fight_types: {
        Row: {
          fight_type_id: number
          profile_id: string
        }
        Insert: {
          fight_type_id: number
          profile_id: string
        }
        Update: {
          fight_type_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_fight_types_fight_type_id_fkey"
            columns: ["fight_type_id"]
            isOneToOne: false
            referencedRelation: "fight_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_opponent_styles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_fighting_styles: {
        Row: {
          fighting_style_id: number
          profile_id: string
        }
        Insert: {
          fighting_style_id: number
          profile_id: string
        }
        Update: {
          fighting_style_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_fighting_styles_fighting_style_id_fkey"
            columns: ["fighting_style_id"]
            isOneToOne: false
            referencedRelation: "fighting_styles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_fighting_styles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_photos: {
        Row: {
          active: boolean
          created_at: string
          id: string
          photo_order: number
          photo_url: string
          profile_id: string
        }
        Insert: {
          active: boolean
          created_at?: string
          id?: string
          photo_order: number
          photo_url: string
          profile_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          id?: string
          photo_order?: number
          photo_url?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_photos_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          date_of_birth: string | null
          fight_type_id: number | null
          fighting_style_id: number | null
          height_cm: number | null
          id: string
          latitude: number | null
          location: unknown | null
          longitude: number | null
          max_distance_km: number | null
          name: string | null
          neighborhood: string | null
          phone: string | null
          updated_at: string
          user_id: string | null
          weight_kg: number | null
          years_of_experience: number | null
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          fight_type_id?: number | null
          fighting_style_id?: number | null
          height_cm?: number | null
          id?: string
          latitude?: number | null
          location?: unknown | null
          longitude?: number | null
          max_distance_km?: number | null
          name?: string | null
          neighborhood?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
          weight_kg?: number | null
          years_of_experience?: number | null
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          fight_type_id?: number | null
          fighting_style_id?: number | null
          height_cm?: number | null
          id?: string
          latitude?: number | null
          location?: unknown | null
          longitude?: number | null
          max_distance_km?: number | null
          name?: string | null
          neighborhood?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string | null
          weight_kg?: number | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_fight_type_id_fkey"
            columns: ["fight_type_id"]
            isOneToOne: false
            referencedRelation: "fight_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_fighting_style_id_fkey"
            columns: ["fighting_style_id"]
            isOneToOne: false
            referencedRelation: "fighting_styles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      challenge_profile: {
        Args: {
          profile: string
          photo?: string
        }
        Returns: string
      }
      get_challengers: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          photo_url: string
          profile: Json
        }[]
      }
      get_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          date_of_birth: string
          height_cm: number
          weight_kg: number
          neighborhood: string
          latitude: number
          longitude: number
          max_distance_km: number
          phone: string
          years_of_experience: number
          fighting_style: Json
          fight_type: Json
          photos: Json
          avatar_url: string
        }[]
      }
      get_profiles: {
        Args: {
          page_size: number
        }
        Returns: {
          id: string
          name: string
          age: number
          height_cm: number
          weight_kg: number
          neighborhood: string
          years_of_experience: number
          fighting_style: string
          fight_type: string
          photos: Json
        }[]
      }
      match: {
        Args: {
          interaction: string
        }
        Returns: undefined
      }
      remove_challenger: {
        Args: {
          interaction: string
        }
        Returns: undefined
      }
      review_profiles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      skip_profile: {
        Args: {
          profile: string
        }
        Returns: string
      }
      unmatch: {
        Args: {
          interaction: string
        }
        Returns: undefined
      }
      update_distance: {
        Args: {
          distance: number
        }
        Returns: undefined
      }
      update_location: {
        Args: {
          latitude: number
          longitude: number
          neighborhood: string
        }
        Returns: undefined
      }
      update_profile:
        | {
            Args: {
              name?: string
              date_of_birth?: string
              height_cm?: number
              weight_kg?: number
              area?: string
              latitude?: number
              longitude?: number
              fighting_style?: number
              fight_type?: number
              photos?: Json
            }
            Returns: undefined
          }
        | {
            Args: {
              name?: string
              date_of_birth?: string
              height_cm?: number
              weight_kg?: number
              neighborhood?: string
              latitude?: number
              longitude?: number
              years_of_experience?: number
              fighting_style?: number
              fight_type?: number
              photos?: Json
            }
            Returns: undefined
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const


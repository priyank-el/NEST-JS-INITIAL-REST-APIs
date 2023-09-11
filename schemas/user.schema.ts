import { Prop , Schema , SchemaFactory } from "@nestjs/mongoose";
import { Document, now } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)

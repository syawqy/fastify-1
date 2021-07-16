import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface KafkaMessagesAttributes {
    messageId?: number;
    topic: string;
    message: string;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedDate?: Date;
    lastUpdatedBy?: string;
}
export interface KafkaMessagesModel extends Model<KafkaMessagesAttributes>, KafkaMessagesAttributes { }
export class KafkaMessages extends Model<KafkaMessagesModel, KafkaMessagesAttributes> { }

export type KafkaMessagesStatic = typeof Model & {
    new(values?: Record<string, any>, options?: BuildOptions): KafkaMessagesModel;
};

const kafkaMessage = {
  messageId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  topic: { type: DataTypes.STRING, allowNull: false, unique: false },
  message: { type: DataTypes.STRING, allowNull: false, unique: false },
  createdDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  createdBy: { type: DataTypes.STRING, allowNull: false },
  LastUpdatedDate: { type: DataTypes.DATE, allowNull: true },
  LastUpdatedBy: { type: DataTypes.STRING, allowNull: true }
}

export function KafkaMessagesFactory (sequelize: Sequelize): KafkaMessagesStatic {
  return <KafkaMessagesStatic>sequelize.define('KafkaMessages', kafkaMessage, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false
  })
}

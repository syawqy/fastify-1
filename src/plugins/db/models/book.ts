import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface BooksAttributes {
    bookId?: number;
    bookTitle: string;
    author: string;
    subject: string;
    year: number;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedDate?: Date;
    lastUpdatedBy?: string;
}
export interface BooksModel extends Model<BooksAttributes>, BooksAttributes { }
export class Books extends Model<BooksModel, BooksAttributes> { }

export type BooksStatic = typeof Model & {
    new(values?: Record<string, any>, options?: BuildOptions): BooksModel;
};

const book = {
  bookId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookTitle: { type: DataTypes.STRING, allowNull: false, unique: false },
  author: { type: DataTypes.STRING, allowNull: false, unique: false },
  subject: { type: DataTypes.STRING, allowNull: false, unique: false },
  year: { type: DataTypes.INTEGER, allowNull: false, unique: false, validate: { min: 1000, max: 2100 } },
  createdDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  createdBy: { type: DataTypes.STRING, allowNull: false },
  LastUpdatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: true },
  LastUpdatedBy: { type: DataTypes.STRING, allowNull: true }
}

export function BooksFactory (sequelize: Sequelize): BooksStatic {
  return <BooksStatic>sequelize.define('Books', book, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false
  })
}
